	atom=new Array();
	atom["H"]= 1.01;
	atom["He"]= 4.00;
	atom["Li"]= 6.94;
	atom["Be"]= 9.01;
	atom["B"]= 10.81;
	atom["C"]= 12.01;
	atom["N"]= 14.01;
	atom["O"]= 16.00;
	atom["F"]= 19.00;
	atom["Ne"]= 20.18;
	atom["Na"]= 22.99;
	atom["Mg"]= 24.31;
	atom["Al"]=26.98;
	atom["Si"]= 28.09;
	atom["P"]= 30.97;
	atom["S"]= 32.07;
	atom["Cl"]= 35.45;
	atom["Ar"]= 39.95;
	atom["K"]= 39.10;
	atom["Ca"]= 40.08;
	atom["Sc"]= 44.96;
	atom["Ti"]= 47.87;
	atom["V"]= 50.94;
	atom["Cr"]= 52.00;
	atom["Mn"]= 54.94;
	atom["Fe"]= 55.85;
	atom["Co"]= 58.93;
	atom["Ni"]= 58.69;
	atom["Cu"]= 63.55;
	atom["Zn"]= 65.39;
	atom["Ga"]= 69.72;
	atom["Ge"]= 72.61;
	atom["As"]= 74.92;
	atom["Se"]= 78.96;
	atom["Br"]= 79.90;
	atom["Kr"]= 83.8;
	atom["Rb"]= 85.47;
	atom["Sr"]= 87.62;
	atom["Y"]= 88.91;
	atom["Zr"]= 91.22;
	atom["Nb"]= 92.91;
	atom["Mo"]= 95.94;
	atom["Tc"]= 98.00;
	atom["Ru"]= 101.07;
	atom["Rh"]= 102.91;
	atom["Pd"]= 106.42;
	atom["Ag"]= 107.87;
	atom["Cd"]= 112.41;
	atom["In"]= 114.82;
	atom["Sn"]= 118.71;
	atom["Sb"]= 121.76;
	atom["Te"]= 127.60;
	atom["I"]= 126.90;
	atom["Xe"]= 131.29;
	atom["Cs"]= 132.91;
	atom["Ba"]= 137.33;
	atom["La"]= 138.91;
	atom["Hf"]= 178.49;
	atom["Ta"]= 180.95;
	atom["W"]= 183.85;
	atom["Re"]= 186.21;
	atom["Os"]= 190.20;
	atom["Ir"]= 192.22;
	atom["Pt"]= 195.08;
	atom["Au"]= 196.97;
	atom["Hg"]= 200.59;
	atom["Tl"]= 204.38;
	atom["Pb"]= 207.20;
	atom["Bi"]= 208.98;
	atom["Po"]= 209.00;
	atom["At"]= 210.00;
	atom["Rn"]= 222.00;
	atom["Fr"]= 223.00;
	atom["Ra"]= 226.00;
	atom["Ac"]= 227.00;
	atom["Rf"]= 261.00;
	atom["Db"]= 262.00;
	atom["Sg"]= 263.00;
	atom["Bh"]= 262.00;
	atom["Hs"]= 265.00;
	atom["Mt"]= 266.00;
	atom["Uun"]= 269.00;
	atom["Uuu"]= 272.00;
	atom["Uub"]= 277.00;
	atom["Ce"]= 140.12;
	atom["Pr"]= 140.91;
	atom["Nd"]= 144.24;
	atom["Pm"]= 145.00;
	atom["Sm"]= 150.36;
	atom["Eu"]= 151.97;
	atom["Gd"]= 157.25;
	atom["Tb"]= 158.93;
	atom["Dy"]= 162.50;
	atom["Ho"]= 164.93;
	atom["Er"]= 167.26;
	atom["Tm"]= 168.93;
	atom["Yb"]= 173.04;
	atom["Lu"]= 174.97;
	atom["Th"]= 232.04;
	atom["Pa"]= 231.04;
	atom["U"]= 238.03;
	atom["Np"]= 237.05;
	atom["Pu"]= 244.00;
	atom["Am"]= 243.00;
	atom["Cm"]= 247.00;
	atom["Bk"]= 247.00;
	atom["Cf"]= 251.00;
	atom["Es"]= 252.00;
	atom["Fm"]= 257.00;
	atom["Md"]= 258.00;
	atom["No"]= 259.00;
	atom["Lr"]= 262.00;

	uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	lowercase="abcdefghijklmnopqrstuvwxyz";
	number="0123456789";
	function calculate(formula) {
	total=new Array(); level=0; total[0]=0; i=0; mass=0; name=''; percision=8;
	elmass=new Array();
	for (i=0; i<elmass.length;i++) {
	elmass[i]=null;
	}
	elmass[0]=new Array();
	for (i=0; i<elmass[0].length;i++) {
	elmass[0][i]=0;
	}
	i=0;
	while (formula.charAt(i)!="") {
	if ((uppercase+lowercase+number+"()").indexOf(formula.charAt(i))==-1)
	i++;
	while (formula.charAt(i)=="(") {
	level++;
	i++;
	total[level]=0;
	elmass[level]=new Array();
	for (h=0; i<elmass[level].length;h++) {
	elmass[level][i]=0;
	}
	}
	if (formula.charAt(i)==")") {
	mass=total[level];
	name='';
	level--;
	}
	else if (uppercase.indexOf(formula.charAt(i))!=-1) {
	name=formula.charAt(i);
	while (lowercase.indexOf(formula.charAt(i+1))!=-1 && formula.charAt(i+1)!="")
	name+=formula.charAt(++i);
	mass=atom[name];
	massStr=mass+"";
	if (massStr.indexOf(".")!=-1)
	masspercis=(massStr.substring(massStr.indexOf(".")+1,massStr.length)).length;
	else
	masspercis=0;
	percision=(percision==8 || percision>masspercis)?masspercis:percision;
	}
	var amount="";
	while (number.indexOf(formula.charAt(i+1))!=-1 && formula.charAt(i+1)!="")
	amount+=formula.charAt(++i);
	if (amount=="") amount="1";
	total[level]+=mass*parseInt(amount);
	if (name=="") {
	for (ele in elmass[level+1]) {
	totalnumber=parseInt(elmass[level+1][ele])*amount
	if (elmass[level][ele]==null)
	elmass[level][ele]=totalnumber;
	else
	elmass[level][ele]=totalnumber+parseInt(elmass[level][ele]);
	}
	}
	else {
	if (elmass[level][name]==null)
	elmass[level][name]=amount;
	else
	elmass[level][name]=parseInt(elmass[level][name])+parseInt(amount);
	}
	i++;
	}
	weight=rounded(total[0],percision);
	previous=document.forms[1].elements[0].value;
	document.forms[1].elements[0].value=document.forms[0].elements[0].value+":"+newline();
	for (ele in elmass[0]) {
	eltotal=eval(elmass[0][ele]*atom[ele]);
	document.forms[1].elements[0].value+=elmass[0][ele]+" "+ele+" * "+atom[ele]+" = "+eltotal+" ("+rounded(eltotal/total[0]*100,percision)+"% of mass)"+newline();
	}
	document.forms[1].elements[0].value+=""+newline()+previous;
	document.forms[1].elements[0].value+= "Total: "+weight+" g/mol"+newline();
	document.forms[1].elements[0].value+=""+newline()+previous;
	document.forms[0].elements[0].value='';
	document.forms[0].elements[0].focus();
	//document.getElementById("endresult").innerHTML = weight;
	$('#molarmass #realTxt').text(weight);
		return weight;
	}
	function newline()
	{
	return (navigator.appName.substring(0,9)=="Microsoft")?'\r':'\n';
	}
	function rounded(number,percision)
	{
	return number;
}