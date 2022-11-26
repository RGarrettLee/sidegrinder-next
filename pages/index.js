import RandomClip from '../components/randomClip';

export default function Home() {

  return (
      <div>
        <div className="flex justify-center align-center flex-col pb-20">
          <h1 className="text-3xl text-center font-bold">Sidegrinder.APP</h1>
        </div>
        <RandomClip></RandomClip>
        <div className="flex justify-center flex-col">
          <h1 className="pt-20 text-center text-2xl">⚠️ Site Under Development ⚠️</h1>
        </div>
    </div>
  )
}
