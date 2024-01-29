import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import type { SupabaseClient } from '@supabase/supabase-js';

import useUpdateProfileMutation from '~/lib/user/hooks/use-update-profile';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import ImageUploadInput from '~/core/ui/ImageUploadInput';
import Trans from '~/core/ui/Trans';
import useSupabase from '~/core/hooks/use-supabase';

import type UserSession from '~/core/session/types/user-session';
import type UserData from '~/core/session/types/user-data';

import configuration from '~/configuration';

const AVATARS_BUCKET = 'avatars';

function UpdateProfileForm({
  session,
  onUpdateProfileData,
}: {
  session: UserSession;
  onUpdateProfileData: (user: Partial<UserData>) => void;
}) {
  const updateProfileMutation = useUpdateProfileMutation();

  const client = useSupabase();
  const { t } = useTranslation();

  const currentPhotoURL = session.data?.photoUrl ?? '';
  const currentDisplayName = session?.data?.displayName ?? '';

  const user = session.auth?.user;
  const email = user?.email ?? '';

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      displayName: currentDisplayName,
      photoURL: currentPhotoURL,
    },
  });

  const onSubmit = async (displayName: string, photoFile: Maybe<File>) => {
    if (!user?.id) {
      return;
    }

    const photoName = photoFile?.name;
    const existingPhotoRemoved = getValues('photoURL') !== photoName;

    let photoUrl = null;

    // if photo is changed, upload the new photo and get the new url
    if (photoName) {
      photoUrl = await uploadUserProfilePhoto(client, photoFile, user.id);
    }

    // if photo is not changed, use the current photo url
    if (!existingPhotoRemoved) {
      photoUrl = currentPhotoURL;
    }

    let shouldRemoveAvatar = false;

    // if photo is removed, set the photo url to null
    if (!photoUrl) {
      shouldRemoveAvatar = true;
    }

    if (photoFile && photoUrl) {
      const urlWithoutParams = photoUrl.split('?')[0];
      const currentPhotoWithoutParams = currentPhotoURL?.split('?')[0];

      if (urlWithoutParams !== currentPhotoWithoutParams) {
        shouldRemoveAvatar = true;
      }
    }

    const info = {
      id: user.id,
      displayName,
      photoUrl,
    };

    // delete existing photo if different
    if (shouldRemoveAvatar && currentPhotoURL) {
      try {
        await deleteProfilePhoto(client, currentPhotoURL);
      } catch (e) {
        console.log(e);
        // old photo not found
      }
    }

    const promise = updateProfileMutation.trigger(info).then(() => {
      onUpdateProfileData(info);
    });

    return toast.promise(promise, {
      success: t(`profile:updateProfileSuccess`),
      error: t(`profile:updateProfileError`),
      loading: t(`profile:updateProfileLoading`),
    });
  };

  const displayNameControl = register('displayName', {
    value: currentDisplayName,
    maxLength: 100,
    minLength: 2,
  });

  const photoURLControl = register('photoURL');

  useEffect(() => {
    reset({
      displayName: currentDisplayName ?? '',
      photoURL: currentPhotoURL ?? '',
    });
  }, [currentDisplayName, currentPhotoURL, reset]);

  return (
    <form
      data-cy={'update-profile-form'}
      onSubmit={handleSubmit((value) => {
        return onSubmit(value.displayName, getPhotoFile(value.photoURL));
      })}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'profile:displayNameLabel'} />

            <TextField.Input
              {...displayNameControl}
              data-cy={'profile-display-name'}
              minLength={2}
              placeholder={''}
              maxLength={100}
            />
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'profile:profilePictureLabel'} />

            <ImageUploadInput
              {...photoURLControl}
              multiple={false}
              onClear={() => setValue('photoURL', '')}
              image={currentPhotoURL}
            >
              <Trans i18nKey={'common:imageInputLabel'} />
            </ImageUploadInput>
          </TextField.Label>
        </TextField>

        <TextField>
          <TextField.Label>
            <Trans i18nKey={'profile:emailLabel'} />

            <TextField.Input disabled value={email} />
          </TextField.Label>

          <div>
            <Button
              type={'button'}
              variant={'ghost'}
              size={'small'}
              href={'../' + configuration.paths.settings.email}
            >
              <span className={'text-xs font-normal'}>
                <Trans i18nKey={'profile:updateEmailSubmitLabel'} />
              </span>
            </Button>
          </div>
        </TextField>

        <div>
          <Button
            className={'w-full md:w-auto'}
            loading={updateProfileMutation.isMutating}
          >
            <Trans i18nKey={'profile:updateProfileSubmitLabel'} />
          </Button>
        </div>
      </div>
    </form>
  );
}

/**
 * @name getPhotoFile
 * @param value
 * @description Returns the file of the photo when submitted
 * It returns undefined when the user hasn't selected a file
 */
function getPhotoFile(value: string | null | FileList) {
  if (!value || typeof value === 'string') {
    return;
  }

  return value.item(0) ?? undefined;
}

async function uploadUserProfilePhoto(
  client: SupabaseClient,
  photoFile: File,
  userId: string,
) {
  const bytes = await photoFile.arrayBuffer();
  const bucket = client.storage.from(AVATARS_BUCKET);
  const extension = photoFile.name.split('.').pop();
  const fileName = await getAvatarFileName(userId, extension);

  const result = await bucket.upload(fileName, bytes, {
    upsert: true,
  });

  if (!result.error) {
    return bucket.getPublicUrl(fileName).data.publicUrl;
  }

  throw result.error;
}

function deleteProfilePhoto(client: SupabaseClient, url: string) {
  const bucket = client.storage.from(AVATARS_BUCKET);
  const fileName = url.split('/').pop()?.split('?')[0];

  if (!fileName) {
    return;
  }

  return bucket.remove([fileName]);
}

async function getAvatarFileName(
  userId: string,
  extension: string | undefined,
) {
  const { nanoid } = await import('nanoid');
  const uniqueId = nanoid(16);

  return `${userId}.${extension}?v=${uniqueId}`;
}

export default UpdateProfileForm;
