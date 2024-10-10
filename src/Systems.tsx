import { useEffect, useState } from "react";
import { SystemType } from "./types";
import { monofazedSystems, trifazedSystems } from "./sys";
import { convertCurrencyToNumber } from "./utils";

type Props = {
  system: SystemType | null;
  setSystem: React.Dispatch<React.SetStateAction<SystemType | null>>;
  tipInstall: string;
  setTipInstall: React.Dispatch<React.SetStateAction<string>>;
  setICan: React.Dispatch<React.SetStateAction<string>>;
  setDockingStation: React.Dispatch<React.SetStateAction<string>>;
  setBatteryNumber: React.Dispatch<React.SetStateAction<string>>;
  setHeatPump: React.Dispatch<React.SetStateAction<string>>;
  batteryNumber: string;
  dockingStation: string;
};

const Systems = ({
  system,
  setSystem,
  setTipInstall,
  setICan,
  setDockingStation,
  setBatteryNumber,
  setHeatPump,
  batteryNumber,
  dockingStation,
}: Props) => {
  const [trifazat, setTrifazat] = useState(false);

  const handleSystemChange = (event: any) => {
    if (trifazat) {
      setSystem(trifazedSystems[event.target.value]);
    }
    if (!trifazat) {
      setSystem(monofazedSystems[event.target.value]);
    }
  };
  useEffect(() => {
    if (trifazat) {
      setSystem(trifazedSystems[0]);
    }
    if (!trifazat) {
      setSystem(monofazedSystems[0]);
    }
  }, [trifazat]);

  const handleCheckboxChange = (event: any) => {
    if (event.target.value === "Trifazat") {
      setTrifazat(true);
    } else {
      setTrifazat(false);
    }
  };

  return (
    <>
      <div className="relative mt-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Tip sistem
        </label>
        <select
          onChange={handleCheckboxChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
        >
          <option>Monofazat</option>
          <option>Trifazat</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-4">
        <div className="w-full px-3 mb-6 md:mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Sistem instalat dorit
          </label>
          <div className="relative">
            <select
              onChange={handleSystemChange}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              {trifazat &&
                trifazedSystems.map((sys, i) => (
                  <option value={i} key={sys.putere}>
                    {sys.putere} - {sys.pret}
                  </option>
                ))}
              {!trifazat &&
                monofazedSystems.map((sys, i) => (
                  <option value={i} key={sys.putere}>
                    {sys.putere} - {sys.pret}
                  </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        {trifazat && (
          <ul className="text-sm px-3">
            <li>
              <b>Invertor</b> : {system?.invertor}
            </li>
            <li>
              <b>Panouri</b> : {system?.panouri}
            </li>
            <li>
              <b>Stocare</b> : {system?.stocare}
            </li>
            <li>
              <b>Numar panouri</b> : {system?.numar}
            </li>
            <li>
              <b>Suprafata necesara</b> : {Number(system?.numar) * 2}mp
            </li>
          </ul>
        )}
        {!trifazat && (
          <ul className="text-sm px-3">
            <li>
              <b>Invertor</b> : {system?.invertor}
            </li>
            <li>
              <b>Panouri</b> : {system?.panouri}
            </li>
            <li>
              <b>Stocare</b> : {system?.stocare}
            </li>
            <li>
              <b>Numar panouri</b> : {system?.numar}
            </li>
            <li>
              <b>Suprafata necesara</b> : {Number(system?.numar) * 2}mp
            </li>
          </ul>
        )}
      </div>
      <div className="w-full my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Baterii extra (optional)
        </label>
        <div className="relative">
          <select
            name="baterii_extra"
            onChange={(e) => setBatteryNumber(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option selected value={"Nu doreste baterii extra"}>
              Nu doresc baterii extra
            </option>
            <option value={"O baterie extra - 3200 lei"}>
              O baterie extra - 3200 lei
            </option>
            <option value={"Doua baterii extra - 6400 lei"}>
              Doua baterii extra - 6400 lei
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Tip instalare
        </label>
        <div className="relative">
          <select
            name="tip_instalare"
            onChange={(e) => setTipInstall(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Acoperis inclinat - Tabla</option>
            <option>Acoperis inclinat - Tigla</option>
            <option>Acoperis Drept + structura in regim propriu</option>
            <option>Acoperis Drept + structura tip domo 450 lei/kw</option>
            <option>Sol + structura la sol 400 lei/kw</option>
            <option>Sol + structura in regim propriu</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Am posibilatate de instalarea bateriilor in interior <br />{" "}
          (Recomandat instalea lor in interior, bateriile ocupa undeva la 50cm
          latime pe 100cm inaltime)
        </label>
        <div className="relative">
          <select
            name="i_can"
            onChange={(e) => setICan(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Nu</option>
            <option>Da</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Doresc statie de incarcare
        </label>
        <div className="relative">
          <select
            name="statie_incarcare"
            onChange={(e) => setDockingStation(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value={"Nu"}>Nu</option>
            <option value={"Pentru sistem monofazic - 3000 lei"}>
              Pentru sistem monofazic - 3000 lei
            </option>
            <option value={"Pentru sistem trifazic - 4000 lei"}>
              Pentru sistem trifazic - 4000 lei (DOAR PENTRU CONTOR TRIFAZIC)
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Doresc pompa de caldura
        </label>
        <div className="relative">
          <select
            name="pompa_caldura"
            onChange={(e) => setHeatPump(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option>Nu</option>
            <option>Da</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full my-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Doresc asigurare
        </label>
        <div className="relative">
          <select
            name="asigurare"
            onChange={(e) => setHeatPump(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option selected value={"Nu doresc asigurare"}>
              Nu
            </option>
            <option
              value={`Doresc asigurare - ${Math.ceil(
                (0.7 / 100) *
                  (convertCurrencyToNumber(system?.pret) +
                    convertCurrencyToNumber(batteryNumber) +
                    convertCurrencyToNumber(dockingStation) +
                    30000)
              )} lei/an`}
            >
              Da (0.7% din pretul sistemului pe an) -{" "}
              {Math.ceil(
                (0.7 / 100) *
                  (convertCurrencyToNumber(system?.pret) +
                    convertCurrencyToNumber(batteryNumber) +
                    convertCurrencyToNumber(dockingStation) +
                    30000)
              )}{" "}
              lei/an
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Systems;
