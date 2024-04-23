/* eslint-disable @next/next/no-img-element */
import { MusicPlayerButtonAddToCart } from "@/components/layout/musicPlayer/MusicPlayerButtonAddToCart";
import { setLocalStorage } from "@/components/utils/handleLocalStorage";
import { $PlayList, PropsBeat } from "@/stores/beats";
import { $SelectedBeat } from "@/stores/beats";
import { useStore } from "@nanostores/react";

export const PlaylistBeatsSection = ({
  beats,
  PlayListName,
}: {
  beats: PropsBeat[];
  PlayListName: string;
}) => {
  const playList = useStore($PlayList);
  const selectedBeat = useStore($SelectedBeat);

  const handleSelectedSong = (beatIndex: number) => {
    const selectedBeat = beats[beatIndex];
    $SelectedBeat.set(selectedBeat);
    $PlayList.set({ name: PlayListName, beats });
    setLocalStorage(`localSelectedBeat`, selectedBeat);
    setLocalStorage(`localPlayList`, { name: PlayListName, beats });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {beats.map((beat, index) => (
        <div
          onClick={() => handleSelectedSong(index)}
          key={beat.idBeat}
          className={`shadow-md hover:shadow-lg ${
            selectedBeat?.idBeat === beat.idBeat &&
            playList.name === PlayListName &&
            "shadow-xl ring-1 ring-secundario/10 scale-105"
          } bg-blanco w-[20rem] relative cursor-pointer flex flex-col gap-1 p-4 rounded-xl transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="flex items-center justify-center">
            <div className="w-1/2">
              <h3 className="text-sm text-secundario/50">
                {beat.productor.username}
              </h3>
              <small className="">
                {beat.genero}
              </small>
              <h4 className="text-secundario/80 font-semibold text-lg">
                {beat.nombre}
              </h4>
            </div>
            <div className={`w-1/2 flex items-center justify-end`}>
              <MusicPlayerButtonAddToCart beat={beat} />
            </div>
          </div>
          <img
            src={`https://img.youtube.com/vi/${beat.url}/mqdefault.jpg`}
            alt={`imagen de ${beat.nombre}`}
            className="rounded-[14px] w-full h-[10rem] object-cover"
          />
          <div className="flex absolute bg-secundario/10 text-slate-200 gap-2 justify-center p-1 rounded-xl right-4">
            <small>{beat.tiempoBpm}bpm,</small>
            <small>{beat.tonalidad}</small>
          </div>
          <small className="flex absolute bg-secundario/10 text-slate-200 gap-2 justify-center p-1 rounded-xl left-4">
            {beat.genero}
          </small>
        </div>
      ))}
    </div>
  );
};
