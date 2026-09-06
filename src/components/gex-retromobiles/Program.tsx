import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { retrieveLocalizedField } from '../../helpers/api/SanityHelper';
import type { IGexRetromobileInfos } from '../../types';
import type { ISanityLocaleImage } from '../../types/api/sanity';

interface Props {
  readonly infos: IGexRetromobileInfos;
  readonly t: TFunction;
  readonly language: string;
}

export default function Program({ infos, t, language }: Readonly<Props>): JSX.Element | null {
  const programmeUrl: ISanityLocaleImage | undefined = infos.programImage ?? undefined;

  if (!programmeUrl) {
    return null;
  }

  return (
    <section>
      <div className='w-full flex justify-center'>
        <img
          src={retrieveLocalizedField(programmeUrl, language)}
          alt={t('gexRetromobilesPage.welcome.heading')}
          className='max-h-96 md:max-h-140 w-auto max-w-full object-contain rounded-lg'
        />
      </div>
    </section>
  );
}
