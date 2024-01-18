import React from 'react'

export default function TrackSearchResult ({ track, chooseTrack }) {
  function handlePlay () {
    chooseTrack(track)
  }
  return (
    <div className='flex m-2 items-center cursor-pointer text-[#fff]' onClick={handlePlay}>
      <img src={track.albumUrl} className='h-16 w-16' />
      <div className='ml-3'>
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  )
}
