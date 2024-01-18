import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';

export const metadata = {
  title: 'About',
};

const AboutPage = () => {
  return (
    <div>
      <Container>
        <div className={'flex flex-col space-y-14 my-8'}>
          <div className={'flex flex-col items-center space-y-4'}>
            <Heading type={1}>About us</Heading>

            <SubHeading>
              We are a team of passionate developers and designers who love to
              build great products.
            </SubHeading>
          </div>

          <div
            className={
              'm-auto flex w-full max-w-xl flex-col items-center space-y-8' +
              ' justify-center text-gray-600 dark:text-gray-400'
            }
          >
            <div>
              We are a team of visionaries, dreamers, and doers who are on a
              mission to change the world for the better
            </div>

            <div>
              With a passion for innovation and a commitment to excellence, we
              are dedicated to creating products and services that will improve
              people&apos;s lives and make a positive impact on society.
            </div>

            <div>
              It all started with a simple idea: to use technology to solve some
              of the biggest challenges facing humanity. We realized that with
              the right team and the right approach, we could make a difference
              and leave a lasting legacy. And so, with a lot of hard work and
              determination, we set out on a journey to turn our vision into
              reality.
            </div>

            <div>
              Today, we are proud to be a leader in our field, and our products
              and services are used by millions of people all over the world.
              But we&apos;re not done yet. We still have big dreams and even
              bigger plans, and we&apos;re always looking for ways to push the
              boundaries of what&apos;s possible.
            </div>

            <div>
              Our Values: At the heart of everything we do is a set of core
              values that guide us in all that we do. These values are what make
              us who we are, and they are what set us apart from the rest.
            </div>

            <div>
              <ul className={'flex list-decimal flex-col space-y-1 pl-4'}>
                <li>
                  Innovation: We are always looking for new and better ways to
                  do things.
                </li>

                <li>
                  Excellence: We strive for excellence in all that we do, and we
                  never settle for less.
                </li>

                <li>
                  Responsibility: We take our responsibilities seriously, and we
                  always act with integrity.
                </li>

                <li>
                  Collaboration: We believe that by working together, we can
                  achieve more than we can on our own.
                </li>
              </ul>
            </div>

            <div>Yes, this was generated with ChatGPT</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
