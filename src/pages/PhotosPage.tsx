import type { UseQueryResult } from '@tanstack/react-query';
import Modal from 'antd/es/modal/Modal';
import type { i18n, TFunction } from 'i18next';
import { nanoid } from 'nanoid';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FcFolder } from 'react-icons/fc';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingCard, Seo } from '../components';
import { goTo } from '../helpers';
import { retrieveLocalizedField } from '../helpers/api/SanityHelper';
import { useSanityDoc } from '../services/SanityService';
import type { IAlbum } from '../types';

export default function PhotosPage(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();
  const { data: albums, isLoading }: UseQueryResult<IAlbum[], Error> =
    useSanityDoc<IAlbum>('album');
  const [selectedAlbum, setSelectedAlbum]: [
    IAlbum | null,
    Dispatch<SetStateAction<IAlbum | null>>,
  ] = useState<IAlbum | null>(null);

  const { albumId }: { albumId?: string } = useParams<{ albumId?: string }>();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!albumId || albums?.length === 0) {
      return;
    }

    const found: IAlbum | undefined = albums?.find((a: IAlbum) => a.id === albumId);

    if (found) {
      setSelectedAlbum(found);
    }
  }, [albums, albumId]);

  function openAlbum(album: IAlbum): void {
    // update URL to include album id so the modal is addressable
    navigate(goTo('/photos/:albumId', [album.id]));
    setSelectedAlbum(album);
  }

  function closeAlbum(): void {
    setSelectedAlbum(null);
    // remove album id from URL so refresh won't re-open the modal
    navigate(goTo('/photos'), { replace: true });
  }

  return (
    <div className='w-full px-4 md:px-6 lg:px-12 max-w-7xl mx-auto py-4 md:py-6 lg:py-8'>
      <Seo
        title={t('photos.pageTitle')}
        description={t('home.navigation.photos.description')}
      />
      <h1 className='text-2xl font-bold mb-10 text-center'>{t('photos.pageTitle')}</h1>
      {isLoading ? (
        <LoadingCard />
      ) : !albums || albums.length === 0 ? (
        <div className='text-gray-600'>{t('shared.error.loadingFailed')}</div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          {albums.map((album: IAlbum) => (
            <button
              key={album.id}
              onClick={() => openAlbum(album)}
              className='group flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition'
              title={retrieveLocalizedField(album.name, i18n.language)}>
              <div className='w-20 h-16 flex items-center justify-center'>
                <FcFolder size={80} />
              </div>
              <span className='mt-3 text-sm text-gray-800 text-center wrap-break-word w-full'>
                {retrieveLocalizedField(album.name, i18n.language)}
              </span>
            </button>
          ))}
        </div>
      )}

      {selectedAlbum && (
        <Modal
          title={retrieveLocalizedField(selectedAlbum.name, i18n.language)}
          centered
          open={true}
          onCancel={closeAlbum}
          footer={null}
          width={'85%'}>
          <div className='max-h-[60vh] md:max-h-[75vh] overflow-auto p-2'>
            <div className='bg-gray-100 p-4 rounded-lg mb-4'>
              <p className='text-sm text-gray-800 whitespace-pre-wrap'>
                {retrieveLocalizedField(selectedAlbum.description, i18n.language)}
              </p>
            </div>
            <div className='columns-1 md:columns-2 space-y-4'>
              {selectedAlbum.photos?.map((photo: string) => (
                <div
                  key={nanoid()}
                  className='mb-4 break-inside-avoid rounded-lg overflow-hidden shadow-sm'>
                  <img
                    src={photo}
                    alt={t('photos.photoAlt', {
                      album: retrieveLocalizedField(selectedAlbum.name, i18n.language),
                    })}
                    className='w-full h-auto object-cover transition-transform duration-200'
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
