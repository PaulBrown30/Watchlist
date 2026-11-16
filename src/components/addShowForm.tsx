import { useState } from "react"
import { cn } from "../utils/cn"


export type newShow = {
    values: {
        title: string,
        year: number,
        kind: "film" | "serie" 
    }
    errors: {
        title: string[],
        year: string[],
        kind: string[]

    }
}

type addShowFormProps = {
    addOrModifyShow : (newShow:newShow) => void
    isUsedShowTitle : (title:string) => boolean
}


const AddShowForm = ({addOrModifyShow,isUsedShowTitle}: addShowFormProps) => {
    
    const newShowDefault = {
        values: {
            title: "",
            year: 0,
            kind: "film" as "film" | "serie"
        },
        errors: {
            title: [] as string[],
            year: [] as string[],
            kind: [] as string[]
        }    
    }

    const [newShow,setNewShow] = useState<newShow>(newShowDefault)

    function OnSubmit(e:React.SubmitEvent<HTMLFormElement>){    

        e.preventDefault();
        var hasError = false;

        let newErrors = {
            title: [] as string[],
            year: [] as string[],
            kind: [] as string[],
        }

        {/*Errori Input titolo */}
        if (newShow.values.title === ""){
        newErrors = {...newErrors,title: [...newErrors.title, "Il titolo è obbligatorio"]}
        hasError = true
        }

        if (newShow.values.title.length < 2){
        newErrors = {...newErrors,title: [...newErrors.title, "Il titolo deve avere almeno 2 caratteri"]}
        hasError = true
        }

        if (isUsedShowTitle(newShow.values.title)){
        newErrors = {...newErrors,title: [...newErrors.title, "Il titolo è gia stato utilizzato"]}
        hasError = true
        }

        {/*Errori Input anno */}
        if (newShow.values.year < 1900 || newShow.values.year > new Date().getFullYear()){
        newErrors = {...newErrors,year: [...newErrors.year, "L'anno deve essere tra 1900 e " + new Date().getFullYear()]}
        hasError = true
        }



        if(hasError){
            setNewShow({...newShow,errors: newErrors})
            return
        }

        setNewShow(newShowDefault)
        addOrModifyShow(newShow)
   }


  return (<>
    <form 
    className="flex flex-col gap-4 justify-center bg-white p-4 shadow-xl w-100 rounded-lg"
    onSubmit={(e) => OnSubmit(e)}
    >
    

        {/*Input titolo */}
        <h1 className="font-bold text-center text-xl">Aggiungi Titolo</h1>
        <input 
            placeholder="Titolo" 
            value = {newShow.values.title} 
            onChange={(e) => setNewShow({...newShow, values: {...newShow.values, title: e.target.value}} )} 
            className = "bg-gray-200 p-2"
        />

        {/*Errori input titolo */}
        <div>
            {newShow.errors.title.map(errore => 
                    <p
                        key = {errore}
                        className="text-[14px] px-2 text-red-500 font-semibold"
                    >
                        {"*"+errore}
                    </p>
                )
            }
        </div>



        {/*Input anno */}
        <h1 className="font-bold text-center text-xl">Aggiungi Anno</h1>
        <input 
            placeholder="Anno" 
            value = {newShow.values.year} 
            onChange={(e) => setNewShow({...newShow, values: {...newShow.values, year: +e.target.value}} )} 
            className = "bg-gray-200 p-2"
        />

        {/*Errori input anno */}
        <div>
            {newShow.errors.year.map(errore => 
                    <p
                        key = {errore}
                        className="text-[14px] px-2 text-red-500 font-semibold"
                    >
                        {"*"+errore}
                    </p>
                )
            }
        </div>

        {/*Input tipo */}
        <div className="flex gap-4 justify-around">
        {["film","serie"].map(filtro => 
        <button
            key = {filtro}
            type="button"
            className={cn(" flex px-4 py-2 bg-gray-400 text-white rounded-lg hover:cursor-pointer hover:opacity-80 font-bold",
                {
                "bg-blue-500": newShow.values.kind === filtro
                }
            )}
            onClick={() => setNewShow({...newShow, values: {...newShow.values, kind: filtro as "film" | "serie"}} )}
        >
            {filtro}
        </button>
        )}
        </div>

        <button
        className="flex p-4 bg-blue-500 hover:cursor-pointer hover:opacity-80 justify-center text-white font-bold"
        >
        <p>
            Aggiungi
        </p>
        </button>
    
    </form>
  </>
  )
}

export default AddShowForm