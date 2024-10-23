"use client";

import PlaylistForm from '@/components/playlist-form/playlist-form'
import React from 'react'

function page() {
    return (
        <div>
            <PlaylistForm edit={false} />
        </div>
    )
}

export default page