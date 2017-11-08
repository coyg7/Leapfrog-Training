
var personalData = [
	{fname: "Sachit", lname:"Shrestha"},
	{dob: "17 November 1995"},
	{pob: "Kathmandu, Nepal"},
	{nationality: "Nepali"},
	{email: "ssachit3761@gmail.com"},
	{languages: ["Nepali", "English"]}
];

var academicData = [
	{degree:"B.E Computer Science and Engineering", yoc:"2017"},
	{degree:"+2", yoc:"2013"},
	{degree:"S.L.C", yoc:"2011"}
];

var projectData = [
	{title:"Predictive Analysis of Ecommerce Product", tnt:" Python, MySQL, Web Scrapping, Sentiment Analysis, NLTK "},
	{title:"Dynamic Online Examination System", tnt:" HTML, CSS, Bootstrap, JavaScript, PHP, SQL"},
	{title:"Restaurant Management System ", tnt:" C#, Visual Studio 2015, SQL Server 2014 "}
];

var interestData = [
	{interests: "Web Development"},
	{interests: "Data Analytics"},
	{interests: "Music"},
	{interests: "Sports"}
];



var mainwrapper = document.getElementById("main-wrapper");
var parent = document.createElement('div');
parent.style.background = "#f3f3f3";
parent.style.width = "1000px";
parent.style.height= "1000px";
parent.style.margin = "0 auto";
parent.style.padding = "20px";
parent.style.fontSize = "24px";
parent.style.color = "#4c4c4c";
parent.innerHTML = "<b>Personal Profile</b><br><br>";
mainwrapper.appendChild(parent);



	var personalDetails = document.createElement('div');
	personalDetails.style.position = "relative";
	personalDetails.style.fontSize = "18px";
	personalDetails.style.borderBottom = "1px solid #2c2c2c";
	personalDetails.style.paddingBottom = "15px";
	personalDetails.innerHTML = ("<b><u>Personal Details</u></b>" + "<br>" +
							"<b><i>Full Name:</b></i> " + personalData[0].fname + " " + personalData[0].lname +
							 "<br>" + "<b><i>Date of Birth:</b></i> " + personalData[1].dob + "<br>" +
							 "<b><i>Place of Birth:</b></i> " + personalData[2].pob + "<br>" +
							 "<b><i>Nationality:</b></i> " + personalData[3].nationality + "<br>" +
							 "<b><i>Email:</b></i> " + personalData[4].email + "<br>" +
							 "<b><i>Languages:</b></i> " + personalData[5].languages + "<br>"
							 );
	parent.appendChild(personalDetails);



	var imageWrapper = document.createElement('img');
	imageWrapper.style.width = "200px";
	imageWrapper.style.height = "200px";
	imageWrapper.style.float = "right";
	imageWrapper.src="image1.jpg";
	imageWrapper.style.position = "absolute";
	imageWrapper.style.marginTop = "0px";
	imageWrapper.style.top = "20px";
	imageWrapper.style.right = "170px";
	imageWrapper.style.background = "green";
	parent.appendChild(imageWrapper);

	var academicDetails = document.createElement('div');
	academicDetails.style.left = "20px";
	academicDetails.style.fontSize = "18px";
	academicDetails.style.borderBottom = "1px solid #2c2c2c";
	academicDetails.style.paddingBottom = "15px";
	
	academicDetails.innerHTML += "<b>Academic Details</b><br>";	
	for(i=0; i<academicData.length; i++){
		academicDetails.innerHTML += ("<b><i>Degree:</i></b> " + academicData[i].degree + "<br>" + "<b><i>Year of Completion:</i></b> " + academicData[i].yoc + "<br><br>");
	}

	parent.appendChild(academicDetails);
	



	var projectDetails = document.createElement('div');
	projectDetails.style.left = "20px";
	projectDetails.style.fontSize = "18px";
	projectDetails.style.borderBottom = "1px solid #2c2c2c";
	projectDetails.style.paddingBottom = "15px";
	
	projectDetails.innerHTML += "<b>Project Details</b><br>";	
	for(i=0; i<projectData.length; i++){
		projectDetails.innerHTML += ("<b><i>Title:</i></b> " + projectData[i].title + "<br>" + "<b><i>Tools and Technologies:</i></b> " + projectData[i].tnt + "<br><br>");
	}
	parent.appendChild(projectDetails);


	var interestDetails = document.createElement('div');
	
	interestDetails.style.left = "20px";
	interestDetails.style.fontSize = "18px";
	
	interestDetails.innerHTML += "<b>Interests</b><br>";	
	for(i=0; i<interestData.length; i++){
		interestDetails.innerHTML += ( interestData[i].interests + "<br><br>");
	}
	parent.appendChild(interestDetails);

