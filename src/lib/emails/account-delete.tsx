import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  render,
} from '@react-email/components';

interface Props {
  productName: string;
  userDisplayName: string;
}

function renderAccountDeleteEmail(props: Props) {
  const previewText = `We have deleted your ${props.productName} account`;

  return render(
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className="bg-gray-50 my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] w-[465px] bg-white">
            <Heading className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0">
              {previewText}
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello {props.userDisplayName},
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              This is to confirm that we&apos;ve processed your request to
              delete your account with {props.productName}.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              We&apos;re sorry to see you go. Please note that this action is
              irreversible, and we&apos;ll make sure to delete all of your data
              from our systems.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              We thank you again for using {props.productName}.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              Best,
              <br />
              The {props.productName} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>,
  );
}

export default renderAccountDeleteEmail;
