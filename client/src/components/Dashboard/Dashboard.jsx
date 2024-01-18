import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useAuth from '../../hooks/useAuth/useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult'
import Player from '../Player/Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
  clientId: '5c13decbc7e248ea811bdec12e6ce368'
})
export default function Dashboard ({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState('')

  function chooseTrack (track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if (!playingTrack) return

    axios.get('http://localhost:3001/lyrics', {
      params: {
        track: playingTrack.title,
        artist: playingTrack.artist
      }
    })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      }))
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <section className='flex flex-col items-center justify-center'>
      <form className=''>
        <input type='search' placeholder='Search songs / artists' value={search} onChange={e => setSearch(e.target.value)} />
      </form>
      <div className='flex flex-col flex-grow-1 my-2 overflow-y-auto'>{searchResults.map(track => (
        <TrackSearchResult
          track={track}
          key={track.uri}
          chooseTrack={chooseTrack}
        />
      ))}
        {searchResults.length === 0 && (
          <div className='text-center text-[#fff]' style={{ whiteSpace: 'pre' }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </section>
  )
}

Dashboard.propTypes = {
  code: PropTypes.node.isRequired
}
