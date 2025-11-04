import Modal from 'antd/es/modal/Modal';
import type { i18n, TFunction } from 'i18next';
import type { Dispatch, JSX, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FcFolder } from 'react-icons/fc';
import { LoadingCard } from '../components';
import { StrapiService } from '../services';
import type { IAlbum, IStrapiImage } from '../types';

export default function PhotosPage(): JSX.Element {
  const { t, i18n }: { t: TFunction; i18n: i18n } = useTranslation();

  const [albums, setAlbums]: [IAlbum[], Dispatch<SetStateAction<IAlbum[]>>] = useState<IAlbum[]>(
    [],
  );
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(true);
  const [selectedAlbum, setSelectedAlbum]: [
    IAlbum | null,
    Dispatch<SetStateAction<IAlbum | null>>,
  ] = useState<IAlbum | null>(null);

  useEffect(() => {
    const fetchAlbums: () => Promise<void> = async (): Promise<void> => {
      setLoading(true);
      try {
        StrapiService.getAlbums(i18n.language).then(setAlbums);
      } catch {
        setAlbums([]);
      }
      setLoading(false);
    };

    void fetchAlbums();
  }, [i18n.language]);

  function openAlbum(album: IAlbum): void {
    setSelectedAlbum(album);
  }

  function closeAlbum(): void {
    setSelectedAlbum(null);
  }

  return (
    <div className='w-full px-4 md:px-6 lg:px-12 max-w-7xl mx-auto py-4 md:py-6 lg:py-8'>
      <h1 className='text-2xl font-bold mb-10 text-center'>{t('photos.pageTitle')}</h1>
      {loading ? (
        <LoadingCard />
      ) : albums.length === 0 ? (
        <div className='text-gray-600'>{t('shared.error.loadingFailed')}</div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          {albums.map((album: IAlbum) => (
            <button
              key={album.id}
              onClick={() => openAlbum(album)}
              className='group flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition'
              title={album.name}>
              <div className='w-20 h-16 flex items-center justify-center'>
                <FcFolder size={80} />
              </div>
              <span className='mt-3 text-sm text-gray-800 text-center wrap-break-word w-full'>
                {album.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {selectedAlbum && (
        <Modal
          title={selectedAlbum.name}
          centered
          open={true}
          onCancel={closeAlbum}
          footer={null}
          width={'85%'}>
          <div className='max-h-[60vh] md:max-h-[75vh] overflow-auto p-2'>
            <div className='bg-gray-100 p-4 rounded-lg mb-4'>
              <p className='text-sm text-gray-800 whitespace-pre-wrap'>
                {selectedAlbum.description}
              </p>
            </div>
            <div className='columns-1 md:columns-2 space-y-4'>
              {selectedAlbum.photos.map((photo: IStrapiImage) => (
                <div
                  key={photo.id}
                  className='mb-4 break-inside-avoid rounded-lg overflow-hidden shadow-sm'>
                  <img
                    src={photo.url}
                    alt={t('photos.photoAlt', { album: selectedAlbum.name })}
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
