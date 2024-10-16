import { useState } from "react";
import Systems from "./Systems";
import { SystemType } from "./types";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { monofazedSystems, trifazedSystems } from "./sys";
import { convertPowerToNumber } from "./utils";

const App = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [judet, setJudet] = useState("");
  const [address, setAddress] = useState("");
  const [system, setSystem] = useState<SystemType | null>(null);
  const [_tipInstall, setTipInstall] = useState("Acoperis inclinat - Tabla");
  const [_iCan, setICan] = useState("Nu");
  const [dockingStation, setDockingStation] = useState("Nu");
  const [batteryNumber, setBatteryNumber] = useState(
    "Nu doreste baterii in plus"
  );
  const [_heatPump, setHeatPump] = useState("Nu");

  const [_platescAvans, setPlatescAvans] = useState("Nu");

  const [_impamantare, setImpamantare] = useState("Realizată individual");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (judet == "" || !judet) {
      Swal.fire("Va rugam sa selectati judetul !");
      return;
    }

    const sistemString = `${system?.putere} - ${system?.pret}\n     Invertor : ${system?.invertor}\n     Panouri : ${system?.panouri}\n     Stocare : ${system?.stocare}\n      Numar panouri : ${system?.numar}`;

    const textAreaElement = document.getElementById(
      "text-area"
    ) as HTMLTextAreaElement | null;

    if (textAreaElement) {
      textAreaElement.value = sistemString;
    }

    const form = document.getElementById("submit-form") as HTMLFormElement;
    if (form) {
      const submitbtn = document.getElementById(
        "submit-btn"
      ) as HTMLButtonElement;
      try {
        setLoading(true);

        submitbtn.innerHTML = "Se trimite...";
        await emailjs.sendForm(
          "service_79hbked",
          "template_nkxr2ll",
          form,
          "SBJiquuj2KZJBCQ-p"
        );
        Swal.fire({
          imageUrl:
            "https://www.jtssolar.ro/wp-content/uploads/2022/03/JTS-Install-Construct-logo-200px.png",
          imageHeight: 50,
          title: "Trimis!",
          text: "Multumim pentru ca ati ales sa colaborati cu noi, va vom contacta in cel mai scurt timp",
          icon: "success",
          confirmButtonText: "Inchide",
        });
        submitbtn.innerHTML = "Trimis !";
      } catch (err: any) {
        setLoading(false);
        submitbtn.innerHTML = "Trimite";
        Swal.fire({
          imageUrl:
            "https://www.jtssolar.ro/wp-content/uploads/2022/03/JTS-Install-Construct-logo-200px.png",
          imageHeight: 50,
          title: "Oops...",
          text: "A aparut o eroare...",
          icon: "error",
          confirmButtonText: "Inchide",
        });
      }
    }
  };

  return (
    <>
      <div className="md:container mx-auto max-w-[90vmin]">
        <h1 className="text-center text-2xl my-8 ">
          Programul Casa Verde <p className="text-green-500">2024</p>
        </h1>
        <h2 className="font-medium flex items-center justify-center text-green-500">
          Powered by
          <img
            src="https://www.jtssolar.ro/wp-content/uploads/2022/03/JTS-Install-Construct-logo-200px.png"
            alt=""
          />
        </h2>
        <div className="flex items-center justify-center w-full mt-8">
          <form
            className="w-full max-w-lg"
            onSubmit={handleSubmit}
            id="submit-form"
          >
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Nume
                </label>
                <input
                  name="nume"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Popescu"
                />
                {/* <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p> */}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Prenume
                </label>
                <input
                  name="prenume"
                  required
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Andrei"
                />
              </div>
            </div>
            <div className="my-6 w-full flex text-center">
              <span
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full cursor-pointer"
                onClick={() =>
                  Swal.fire({
                    title: "Calculator",
                    imageUrl:
                      "https://www.jtssolar.ro/wp-content/uploads/2022/03/JTS-Install-Construct-logo-200px.png",
                    imageHeight: 50,
                    text: "Introduceti numarul de kilowati consumati pe luna",
                    input: "text",
                    inputAutoFocus: true,
                    inputPlaceholder: "500",
                    inputValidator: (value) => {
                      // Check if the value is not a number or empty
                      if (!/^\d+$/.test(value)) {
                        return "Scrieti doar numarul";
                      }
                      return null;
                    },
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonText: "Inchide",
                    confirmButtonText: "Calculeaza",
                    preConfirm: (value) => {
                      // Convert input value to number
                      const kilowati = Number(value);
                      if (kilowati <= 0) {
                        Swal.showValidationMessage(
                          "Valoarea trebuie sa fie mai mare decat zero."
                        );
                        return false;
                      }

                      // Calculate the required system
                      const calculated = kilowati / 30 / 3.3;

                      // Find suitable systems from both monofazat and trifazat
                      const monoFazedsystem =
                        monofazedSystems.find(
                          (sys) =>
                            convertPowerToNumber(sys.putere) > calculated &&
                            !sys.putere.includes("Victron")
                        ) || monofazedSystems[monofazedSystems.length - 1];

                      const victronSystem =
                        monofazedSystems.find(
                          (sys) =>
                            convertPowerToNumber(sys.putere) > calculated &&
                            sys.putere.includes("Victron")
                        ) ||
                        monofazedSystems.filter((sys) =>
                          sys.putere.includes("Victron")
                        )[
                          monofazedSystems.filter((sys) =>
                            sys.putere.includes("Victron")
                          ).length - 1
                        ];

                      const trifazedSystem =
                        trifazedSystems.find(
                          (sys) => convertPowerToNumber(sys.putere) > calculated
                        ) || trifazedSystems[trifazedSystems.length - 1];

                      // Display the recommendation message
                      if (monoFazedsystem && trifazedSystem) {
                        Swal.fire({
                          title: "Calculator",
                          imageUrl:
                            "https://www.jtssolar.ro/wp-content/uploads/2022/03/JTS-Install-Construct-logo-200px.png",
                          imageHeight: 50,
                          customClass: {
                            htmlContainer: "text-xs", // Tailwind or custom CSS class for smaller text
                          },
                          html: `
                            <span>Pentru consumul dvs, recomandam:<br></span>
                            <span style="font-size: 15px;">
                              • <b>Sistemul monofazat ${monoFazedsystem.putere} - ${monoFazedsystem.pret}<br></b>
                              • <b>Sistemul ${victronSystem.putere} - ${victronSystem.pret}<br></b>
                              • <b>Sistemul trifazat ${trifazedSystem.putere} - ${trifazedSystem.pret}</b>
                            </span>
                          `,
                        });
                      } else {
                        Swal.showValidationMessage(
                          "Nu am gasit un sistem potrivit."
                        );
                        return false;
                      }
                    },
                  })
                }
              >
                Vezi ce ti se potriveste !
              </span>
            </div>
            <div className="flex flex-wrap -mx-3 mb">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  judet
                </label>
                <div className="relative">
                  <select
                    name="judet"
                    onChange={(e) => setJudet(e.target.value)}
                    value={judet}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option value="" disabled selected>
                      Alegeti
                    </option>
                    <option>Alba</option>
                    <option>Arad</option>
                    <option>Argeș</option>
                    <option>Bacău</option>
                    <option>Bihor</option>
                    <option>Bistrița-Năsăud</option>
                    <option>Botoșani</option>
                    <option>Brașov</option>
                    <option>Brăila</option>
                    <option>Bucuresti</option>
                    <option>Buzău</option>
                    <option>Caraș-Severin</option>
                    <option>Călărași</option>
                    <option>Cluj</option>
                    <option>Constanța</option>
                    <option>Covasna</option>
                    <option>Dâmbovița</option>
                    <option>Dolj</option>
                    <option>Galați</option>
                    <option>Giurgiu</option>
                    <option>Gorj</option>
                    <option>Harghita</option>
                    <option>Hunedoara</option>
                    <option>Ialomița</option>
                    <option>Iași</option>
                    <option>Ilfov</option>
                    <option>Maramureș</option>
                    <option>Mehedinți</option>
                    <option>Mureș</option>
                    <option>Neamț</option>
                    <option>Olt</option>
                    <option>Prahova</option>
                    <option>Sălaj</option>
                    <option>Satu Mare</option>
                    <option>Sibiu</option>
                    <option>Suceava</option>
                    <option>Teleorman</option>
                    <option>Timiș</option>
                    <option>Tulcea</option>
                    <option>Vâlcea</option>
                    <option>Vaslui</option>
                    <option>Vrancea</option>
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
              <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Adresa
                </label>
                <input
                  name="adresa"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Oras, Strada, Numar"
                />
              </div>
            </div>
            <hr />
            <Systems
              tipInstall={_tipInstall}
              system={system}
              setSystem={setSystem}
              setTipInstall={setTipInstall}
              setICan={setICan}
              setDockingStation={setDockingStation}
              setBatteryNumber={setBatteryNumber}
              setHeatPump={setHeatPump}
              batteryNumber={batteryNumber}
              dockingStation={dockingStation}
            />
            <div className="w-full my-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Platesc contributia in avans
              </label>
              <div className="relative">
                <select
                  name="avans"
                  onChange={(e) => setPlatescAvans(e.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value={"Nu"}>Nu</option>
                  <option value={"Da"}>Da</option>
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
                Modalitate de implementare a împământării
              </label>
              <div className="relative">
                <select
                  name="impamantare"
                  onChange={(e) => setImpamantare(e.target.value)}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value={"Realizată individual"}>
                    Realizată individual
                  </option>
                  <option value={"Realizată de echipa noastra"}>
                    Realizată de echipa noastra
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
            <div className="flex items-center justify-center my-8">
              <button
                type="submit"
                id="submit-btn"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Trimite
              </button>
            </div>
            <textarea className="hidden" name="sistem" id="text-area" />
          </form>
        </div>
        <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
          <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
            © 2024 Copyright:{" "}
            <a href="https://www.jtssolar.ro/">JTS Solar Install Construct</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
