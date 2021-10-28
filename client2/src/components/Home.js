import React from 'react'
import Banner from './Banner'
import Banner2 from './Banner2'
import Featured from './Featured'
import Featuredprod from './Featuredprod'
import Banner3 from './Banner3'
import Map from './Map'
export default function Home() {
    return (
        <div>
            <Banner/>
            <Featuredprod/>
            <Banner3/>
            <Banner2/>
            <Featured/>
            <Map/>
            
        </div>
    )
}
