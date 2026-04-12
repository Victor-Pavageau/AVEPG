import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import type { IGexRetromobileInfos } from '../../types';

interface Props {
  readonly infos: IGexRetromobileInfos;
  readonly t: TFunction;
}

export default function Program({ infos, t }: Readonly<Props>): JSX.Element | null {
  const programmeUrl: string | undefined = infos.programImage?.url ?? undefined;

  if (!programmeUrl) {
    return null;
  }

  return (
    <section>
      <div className='w-full'>
        <img
          src={programmeUrl}
          alt={t('gexRetromobilesPage.welcome.heading')}
          className='w-full object-contain rounded-lg'
        />
      </div>
    </section>
  );
}
