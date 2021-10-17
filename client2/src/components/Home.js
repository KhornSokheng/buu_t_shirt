import React from 'react'
import Banner from './Banner'
import Banner2 from './Banner2'
import Featured from './Featured'
import Featuredprod from './Featuredprod'

export default function Home() {
    return (
        <div>
            <Banner/>
            <Featuredprod/>
            <Banner2/>
            <Featured/>
        </div>
    )
}
