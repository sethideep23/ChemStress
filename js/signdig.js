

// Copyright 2002-2003. Dr. Christer Svensson
   
<!--

function decimalpoint(number) {
   //Returns true if there is a decimalpoint in number
   if (number.indexOf(".") < 0) {
      return false;
   }
   return true;
}

function exponent(number) {
   //Returns true if there is an e or an E in number
   if (number.indexOf("e") < 0 && number.indexOf("E") < 0) {
      return false;
   }
   return true;
}

function significantFigures(number) {
   //Returns the number of significant figures in number 
   figures=number.length;
   if (exponent(number)) { 			//Don't include the exponent
     if(number.indexOf("e")>0) {
        figures=number.indexOf("e");
     }
     if(number.indexOf("E")>0) {
        figures=number.indexOf("E");
     }
   }  
   for (var i=0; i < number.length; i++) { 	 //Subtract the number of leading +, -, 0
     if (number.charAt(i)=="0" || number.charAt(i)=="+" || number.charAt(i)=="-" || number.charAt(i)==".") {
        if (number.charAt(i)!=".") {
           figures--;
        }
        continue;
     }
     break;
   }
   if (decimalpoint(number)) {   		//Subtract the decimalpoint
     figures--;
   }
   return figures;
}   
   
function theExponent(fstring) {
   // Returns the exponent in fstring as for instance e+5
   if (exponent(fstring)) {
      start=Math.max(fstring.indexOf("E"), fstring.indexOf("e"));
      entexp = "";
      for (var i=start; i < fstring.length; i++) { 	
         entexp = entexp + fstring.charAt(i);
         continue;
      }
      return entexp;
   }
   return "";
}
   
function numFormat(stringToFormat, signFigures) {
   //Returns stringToFormat formated to signFigures significant digits (max 20)
   if (signFigures >= 20 || signFigures <= 0) {
      alert ("Too many or too few significant digits!");
      return stringToFormat;
   }
   mantissa=""
   for (var i=0; i < stringToFormat.length; i++) {	//Get the mantissa
      if (stringToFormat.charAt(i) == "E" || stringToFormat.charAt(i) == "e") {
         break;
      }
      mantissa = mantissa + stringToFormat.charAt(i);
      continue;
   }
   potensOfTen=0;
   m = eval(mantissa);
   while (Math.abs(m) >= Math.pow(10,signFigures)) {
      m = m / 10;
      potensOfTen++;
   }
   while (Math.abs(m) < Math.pow(10,signFigures-1)) {
      m = m * 10;
      potensOfTen--;
   }
   
   sign = "";
   if (m < 0) {
      m = Math.abs(m);
      sign = "-"
   }  
   
   before = m.toString();
   m = Math.round(m); 
   after = m.toString();
   if (before.charAt(0) == "9" && after.charAt(0) == "1") {
      m = Math.round(m/10);
      potensOfTen++;
   }

   mantissa = m.toString();

   if (potensOfTen == 0) {
      return sign + mantissa + theExponent(stringToFormat);
   }	
   
   mantissaTemp = mantissa;
   mantissa = "";
   
   if (potensOfTen > 0) {
      for (i=0; i <= mantissaTemp.length; i++) {
         mantissa = mantissa + mantissaTemp.charAt(i);
         if (i == 0 && mantissaTemp.length > 1) {
            mantissa = mantissa + ".";
         }
      }
      exp10 = eval(potensOfTen + mantissaTemp.length - 1);
      result = mantissa.toString() + "e+" + exp10.toString();
      return sign + result;
   }		        
  
   if (Math.abs(potensOfTen) < signFigures) {
      for (i = 0; i <= mantissaTemp.length; i++) {
         mantissa = mantissa + mantissaTemp.charAt(i);
         if (i == mantissaTemp.length - Math.abs(potensOfTen) - 1) {
            mantissa = mantissa + ".";
         }
      }
      return sign + mantissa + theExponent(stringToFormat);
   }
   
   if (Math.abs(potensOfTen) >= signFigures) {
      mantissa = "0.";
      for (i=1; i <= Math.abs(potensOfTen) - signFigures; i++) {
         mantissa = mantissa + "0";
      }
      for (i=0; i <= mantissaTemp.length; i++) {
         mantissa = mantissa + mantissaTemp.charAt(i);
      }
      return sign + mantissa + theExponent(stringToFormat);
   }

}


//-->

