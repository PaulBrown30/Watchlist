import { useState } from "react"
import { Header } from "./components/header"
import { Showrow } from "./components/showrow"
import { watchlist as initialWatchlist } from "./data/watchlist"
import { cn } from "./utils/cn"
import { type Show } from "./data/watchlist"
import { type newShow } from "./components/addShowForm"
import AddShowForm from "./components/addShowForm"

function App() {

  const [showDaGuardare, setShowDaGuardare] = useState<Show>()
  const [activeFilter,setActiveFilter] = useState<Filter>("tutti")
  const [watchlist,setWatchlist] = useState(initialWatchlist)


  type Filter = "tutti" | "film" | "serie"

  function onClickShow(show: Show) {
    if ( showDaGuardare?.id == show.id){
      setShowDaGuardare(undefined)
    } else {
      setShowDaGuardare(show)
    }
  }

  function addShow (newShow:newShow){
    setWatchlist([
      ...watchlist,
      {
        id: Math.max(...watchlist.map(show => show.id)),
        title: newShow.values.title,
        year: newShow.values.year,
        kind: newShow.values.kind
      }
    ])
  }

  function isUsedShowTitle (title:string):boolean{
    let titleLowerCase = title.toLowerCase();
    return watchlist.some(show => show.title.toLowerCase() === titleLowerCase)
  }

  return <>
       <section className="justify-center items-center bg-green-200 h-screen">
          {<Header/>}

          <div className="flex gap-4 mt-4 justify-center">
            {["tutti", "film" ,"serie"].map(filtro => 
              <button
              key = {filtro}
              className = {cn("px-6 py-2 bg-gray-400 rounded-full hover:cursor-pointer hover:opacity-80 text-white font-bold",
                {
                  "bg-blue-500": activeFilter === filtro
              })}
              onClick = {() => {
                setActiveFilter(filtro as Filter)
              }}
              >
                {filtro}
              </button>
            )}
          </div>


          <div className="flex flex-col p-4 mt-4  items-center justify-center gap-4">
            {watchlist.filter(show => activeFilter === "tutti" || activeFilter === show.kind).map(show => 
            <Showrow
                key = {show.id}
                show = {show}
                onClick = {() => {onClickShow(show)}}
            />
            )}

            <div className={cn( "flex justify-center items-center bg-white p-4 shadow-xl ",
              {
                "hidden": showDaGuardare == null,
              })            
            }>
              <p>{"Stasera guardo " + showDaGuardare?.title} </p>
            </div>

            {/* Add song Form*/}
            <AddShowForm
            addShow={addShow}
            isUsedShowTitle = {isUsedShowTitle}
            />
          </div>



       </section>
      </>
  }

export default App