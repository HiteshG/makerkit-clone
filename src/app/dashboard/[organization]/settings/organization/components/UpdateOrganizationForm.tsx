'use client';

import { useCallback, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import type { SupabaseClient } from '@supabase/supabase-js';

import OrganizationContext from '~/lib/contexts/organization';
import useUpdateOrganizationMutation from '~/lib/organizations/hooks/use-update-organization-mutation';

import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import ImageUploadInput from '~/core/ui/ImageUploadInput';
import Label from '~/core/ui/Label';
import Trans from '~/core/ui/Trans';

import useSupabase from '~/core/hooks/use-supabase';
import type Organization from '~/lib/organizations/types/organization';

const UpdateOrganizationForm = () => {
  const client = useSupabase();

  const { organization, setOrganization } = useContext(OrganizationContext);
  const updateOrganizationMutation = useUpdateOrganizationMutation();
  const { t } = useTranslation('organization');

  const currentOrganizationName = organization?.name ?? '';
  const currentLogoUrl = organization?.logoURL || null;

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: {
      name: currentOrganizationName,
      logoURL: currentLogoUrl,
    },
  });

  const onSubmit = useCallback(
    async (organizationName: string, logoFile: Maybe<File>) => {
      const organizationId = organization?.id;

      if (!organizationId) {
        const errorMessage = t(`updateOrganizationErrorMessage`);

        return toast.error(errorMessage);
      }

      const logoName = logoFile?.name;
      const currentLogoURL = getValues('logoURL');
      const existingLogoRemoved = currentLogoURL !== logoName;

      let logoURL: string | null = null;

      // if photo is changed, upload the new photo and get the new url
      if (logoName) {
        logoURL = await uploadLogo({
          client,
          logo: logoFile,
          organizationId,
        }).catch(() => {
          toast.error(t(`updateLogoErrorMessage`));

          return null;
        });
      }

      // if photo is not changed, use the current photo url
      if (!existingLogoRemoved) {
        logoURL = currentLogoURL;
      }

      let shouldRemoveLogo = false;

      // if photo is removed, set the photo url to null
      if (!logoURL) {
        shouldRemoveLogo = true;
      }

      if (logoFile && logoURL && currentLogoUrl) {
        const urlWithoutParams = logoURL?.split('?')[0];
        const currentPhotoWithoutParams = currentLogoUrl?.split('?')[0];

        if (urlWithoutParams !== currentPhotoWithoutParams) {
          shouldRemoveLogo = true;
        }
      }

      // if the logo is provided and differs from the existing one
      // upload it to the storage
      if (shouldRemoveLogo && currentLogoUrl) {
        await deleteLogo(client, currentLogoUrl);
      }

      if (!logoName && currentLogoUrl) {
        // if the user removed the logo
        logoURL = null;
      }

      const organizationData: WithId<Partial<Organization>> = {
        id: organization.id,
        name: organizationName,
      };

      if (logoURL !== undefined) {
        organizationData.logoURL = logoURL;
      }

      const promise = updateOrganizationMutation
        .trigger(organizationData)
        .then(() => {
          setOrganization({
            ...organization,
            name: organizationName,
            logoURL: logoURL,
          });
        });

      toast.promise(promise, {
        loading: t(`updateOrganizationLoadingMessage`),
        success: t(`updateOrganizationSuccessMessage`),
        error: t(`updateOrganizationErrorMessage`),
      });
    },
    [
      organization,
      getValues,
      currentLogoUrl,
      updateOrganizationMutation,
      t,
      client,
      setOrganization,
    ],
  );

  useEffect(() => {
    reset({
      name: organization?.name,
      logoURL: organization?.logoURL,
    });
  }, [organization, reset]);

  const nameControl = register('name', {
    required: true,
  });

  const logoControl = register('logoURL');

  return (
    <form
      onSubmit={handleSubmit((value) => {
        return onSubmit(value.name, getLogoFile(value.logoURL));
      })}
      className={'space-y-4'}
    >
      <div className={'flex flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            <Trans i18nKey={'organization:organizationNameInputLabel'} />

            <TextField.Input
              {...nameControl}
              data-cy={'organization-name-input'}
              required
              placeholder={'Your organization name'}
            />
          </TextField.Label>
        </TextField>

        <Label>
          <Trans i18nKey={'organization:organizationLogoInputLabel'} />

          <ImageUploadInput
            {...logoControl}
            multiple={false}
            image={currentLogoUrl}
            onClear={() => setValue('logoURL', '')}
          >
            <Trans i18nKey={'common:imageInputLabel'} />
          </ImageUploadInput>
        </Label>

        <div>
          <Button
            className={'w-full md:w-auto'}
            data-cy={'update-organization-submit-button'}
            loading={updateOrganizationMutation.isMutating}
          >
            <Trans i18nKey={'organization:updateOrganizationSubmitLabel'} />
          </Button>
        </div>
      </div>
    </form>
  );
};

/**
 * @description Upload file to Storage
 * @param client
 * @param organizationId
 * @param logo
 */
async function uploadLogo({
  client,
  organizationId,
  logo,
}: {
  client: SupabaseClient;
  organizationId: number;
  logo: File;
}) {
  const bytes = await logo.arrayBuffer();
  const bucket = client.storage.from('logos');
  const fileName = await getLogoName(logo.name, organizationId);

  const result = await bucket.upload(fileName, bytes, {
    upsert: true,
    contentType: logo.type,
  });

  if (!result.error) {
    return bucket.getPublicUrl(fileName).data.publicUrl;
  }

  throw result.error;
}

async function getLogoName(fileName: string, organizationId: number) {
  const { nanoid } = await import('nanoid');
  const uniqueId = nanoid(16);
  const extension = fileName.split('.').pop();

  return `${organizationId}.${extension}?v=${uniqueId}`;
}

function getLogoFile(value: string | null | FileList) {
  if (!value) {
    return;
  }

  if (typeof value === 'string') {
    return new File([], value);
  }

  return value.item(0) ?? undefined;
}

function deleteLogo(client: SupabaseClient, url: string) {
  const bucket = client.storage.from('logos');
  const fileName = url.split('/').pop()?.split('?')[0];

  if (!fileName) {
    return Promise.reject(new Error('Invalid file name'));
  }

  return bucket.remove([fileName]);
}

export default UpdateOrganizationForm;
