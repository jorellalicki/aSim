/*
Acoustics Math Core Functions

*/

//A weighting constant
var centerfreqs = [16,31.5,63,125,250,500,1000,2000,4000,8000,16000]; 
var aweight = [-56.7, -39.4, -26.2, -16.1, -8.6, -3.2, 0, 1.2, 1, -1.1, -6.6];
var cweight = [-8.5, -3, -.8, -.2, 0, 0, 0, -.2, -.8, -3, -8.5];


////////////////////////////////////////////////////////
////                                                ////
////     Acoustics Conversions - Watts, dB          ////
////                                                ////
////////////////////////////////////////////////////////

//Converts a power array to decibels, unweighted. Assumes 11 element array.
function am_wattstodb(input){    
	var outputdb = 0;
	var tempdbspl = [];
   for(var i = 0; i < input.length; i++){
	  tempdbspl.push(math.sqrt(input[i]*413)); //Convert intensity (w/m^2) to SPL
   }
   for(var i = 0; i < tempdbspl.length; i++){
	  psum+=math.pow(tempdbspl[i],2); 
   }
   return 10*math.log10(psum/.00002);
}


//Converts a power array to decibels, A weighted. Assumes 11 element array.
function am_wattstodbA(input){    
	var outputdb = 0;
	var tempdbspl = [];
   for(var i = 0; i < input.length; i++){
	  tempdbspl.push(math.sqrt(input[i]*413)+aweight[i]); //Convert intensity (w/m^2) to SPL, A weighted
   }
   for(var i = 0; i < tempdbspl.length; i++){
	  psum+=math.pow(tempdbspl[i],2); 
   }
   return 10*math.log10(psum/.00002);
}

//Converts a power array to decibels, C weighted. Assumes 11 element array.
function am_wattstodbA(input){    
	var outputdb = 0;
	var tempdbspl = [];
   for(var i = 0; i < input.length; i++){
	  tempdbspl.push(math.sqrt(input[i]*413)+cweight[i]); //Convert intensity (w/m^2) to SPL, C weighted
   }
   for(var i = 0; i < tempdbspl.length; i++){
	  psum+=math.pow(tempdbspl[i],2); 
   }
   return 10*math.log10(psum/.00002);
}


////////////////////////////////////////////////////////
////                                                ////
////     Acoustics Metrics - RT30,Clarity, etc      ////
////                                                ////
////////////////////////////////////////////////////////






