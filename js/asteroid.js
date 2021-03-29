const asteroid = ( y = 1, size = 5, fps = 24) => {
    let element = document.createElement('a-sphere')

    let signal = Math.floor(Math.random() * ( 200 )) % 2

    let x = Math.floor(Math.random() * ( signal ? 1 : -1 ) * size)
    
    element.setAttribute('position', { x : x, y : -10, z : - ( size * size )})
    element.setAttribute('material', 'color', 'white')
    element.setAttribute('radius', 0.02 + Math.random() / 10 )
    
    let frame_interval = Math.floor( 1000 / fps )
    let step = Math.random() 

    setInterval (() => {
        let position = element.getAttribute('position')
        let x2 = Math.floor(Math.random() * ( signal ? 1 : -1 ) * size )
        let m = ( x2 - x ) / ( size )
        let angle = Math.atan ( m )

        let new_x = position.x + step * Math.sin ( angle )
        let new_z = position.z + step * Math.cos ( angle )

        if ( new_z > size * size )
            new_z = - ( size * size )

        if ( new_x > size * size )
            new_x = - ( size * size )

        element.setAttribute('position', { x : new_x, y : y, z : new_z})
    }, frame_interval)

    return element
};

export default asteroid;