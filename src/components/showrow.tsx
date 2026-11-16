"use client";
import { useState } from "react"
import type { Show } from "../data/watchlist"
import { cn } from "../utils/cn"



type showRowProps = {
    show: Show
    onClick: () => void
}

export function Showrow({show,onClick}: showRowProps){

    const [visto,setVisto] = useState<boolean>(false)
    const [voto,setVoto] = useState<number>(0)

    function newVote(nuovoVoto:number){

        if(voto == nuovoVoto) {
            setVoto(0)
            return
        }

        setVoto(nuovoVoto)
    }

    return <>
        <div className = "flex flex-row gap-4 items-center justify-between w-100 bg-white shadow-xl p-2 px-4 rounded-md">
            <div className="flex flex-row justify-between gap-4 items-center w-80">
                <div className="flex flex-col">
                    <p className={cn("font-bold",
                        {
                            "line-through": visto
                        }
                    )}
                    onClick = {onClick}
                    >{show.title}</p>
                    <p >{show.year}</p>


                    <div className="flex flex-row gap-2">
                        {[1, 2, 3, 4, 5].map((numero) => (
                        <div
                            key={numero}
                            className={cn(
                            "w-8 h-8 text-gray-400 hover:cursor-pointer hover:opacity-80",
                            { "text-yellow-400": voto >= numero }
                            )}
                            onClick={() => newVote(numero)}
                        >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        ))}
                    </div>
                </div>

                <div className={cn("p-2 rounded-lg font-bold capitalize ",
                        {" bg-blue-300 text-blue-600" : show.kind == "film",
                        "bg-red-300 text-red-600" : show.kind == "serie",
                        }
                    )}>
                    <p>{show.kind}</p>
                </div>
            </div>

            <div
                className="flex flex-col items-center gap-1 p-1"
            >
                <p
                    className="font-bold text-green-400"
                >Visto</p>
                <input 
                    type="checkbox"
                    className="size-4"
                    checked = {visto}
                    onChange={(e) => {setVisto(e.target.checked)}}
                />
            </div>



        </div>
    </>
}