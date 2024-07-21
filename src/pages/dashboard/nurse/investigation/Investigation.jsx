import React from 'react'

const Investigation = () => {
    return (
        <div className='p-5'>
            <form action="" className='grid grid-cols-2 gap-10'>
                <textarea name="" placeholder='Complain' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='History Of Complain' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Cause' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Course' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Complication' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Care' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Past Medical History' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='System Review' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Family and Social History' className='rounded-2xl p-3' rows={6} id=""></textarea>
                <textarea name="" placeholder='Possible Diagnoses' className='rounded-2xl p-3' rows={6} id=""></textarea>
            </form>
        </div>
    )
}

export default Investigation;