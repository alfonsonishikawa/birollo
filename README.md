Birollo
=======
Cross eyes stereoscopic canvas library.

Developed after a 12 hours javascript course, started as a proof of concept to test prototype features in javascript. Seems canvas makes some checks about the instance when extending, so is not really possible to do what I wanted to do. Anyway, I managed to make it realively transparent to the programmer.

Online example: [http://alfonsonishikawa.github.io/birollo](http://alfonsonishikawa.github.io/birollo)

I encourage to read the instructions before (not mine): [http://www.starosta.com/3dshowcase/ihelp.html](http://www.starosta.com/3dshowcase/ihelp.html)

Features implemented
--------------------
* fillRect
* drawImage

Features TO DO
--------------
* Enable/disable the stereoscopic effect.
* Queue the drawing commands to draw at the end in proper order (calling a new function commint() or something).
* Callback to determine the depth of the elements, so already existing programs can "realtively" easy to update to stereoscopic.
* Computations of X, Y and Depth cached.
* Implement the strereoscopic wrapper for all possible functions of canvas ([http://www.w3.org/TR/2014/CR-2dcontext-20140821/](http://www.w3.org/TR/2014/CR-2dcontext-20140821/))
