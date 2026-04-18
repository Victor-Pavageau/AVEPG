import type { TFunction } from 'i18next';
import { nanoid } from 'nanoid';
import type { JSX } from 'react';
import { Card } from '../../components';
import type { IGexRetromobileInfos } from '../../types';

interface Props {
  readonly t: TFunction;
  readonly infos: IGexRetromobileInfos;
  readonly language?: string;
}

function formatEdition(edition: number, language: string | undefined): string {
  if (!language || language.startsWith('en')) {
    const s: string[] = ['th', 'st', 'nd', 'rd'];
    const v: number = edition % 100;

    return `${edition}${edition % 10 <= 3 && (v < 11 || v > 13) ? s[edition % 10] : s[0]}`;
  }

  return `${edition}ème`;
}

export default function WelcomeExperience({ t, infos, language }: Readonly<Props>): JSX.Element {
  return (
    <>
      <section>
        <Card>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
            {t('gexRetromobilesPage.welcome.heading', { year: infos.year })}
          </h2>
          <p className='text-gray-700 mb-4'>
            {t('gexRetromobilesPage.welcome.intro', {
              edition: formatEdition(infos.editionNumber, language),
              year: infos.year,
            })}
          </p>

          <div className='flex flex-col sm:flex-row gap-3'>
            {(t('gexRetromobilesPage.welcome.pills', { returnObjects: true }) as string[]).map(
              (pill: string) => (
                <div
                  key={nanoid()}
                  className='bg-[#f3f7fb] rounded-full px-4 py-2 text-sm font-medium text-gray-800'>
                  {pill}
                </div>
              ),
            )}
          </div>
        </Card>
      </section>

      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card>
            <h3 className='text-xl font-semibold mb-3'>
              🔧 {t('gexRetromobilesPage.experience.immersiveTitle')}
            </h3>
            <ul className='list-disc pl-5 space-y-1 text-gray-700'>
              {(
                t('gexRetromobilesPage.experience.immersiveItems', {
                  returnObjects: true,
                }) as string[]
              ).map((it: string) => (
                <li key={nanoid()}>{it}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className='text-xl font-semibold mb-3'>
              🤝 {t('gexRetromobilesPage.experience.meetTitle')}
            </h3>
            <ul className='list-disc pl-5 space-y-1 text-gray-700'>
              {(
                t('gexRetromobilesPage.experience.meetItems', { returnObjects: true }) as string[]
              ).map((it: string) => (
                <li key={nanoid()}>{it}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </>
  );
}
