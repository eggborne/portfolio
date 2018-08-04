var currentPage = 0
var sectionBodies = {
  projects : '<div class="row"><div id="column1" class="col-sm-6"></div><div id="column2" class="col-sm-6"></div></div>',
  about : '<div class="page-header"><h1>About Mike</h1></div> <p> <div class="page-header"><h1>Education</h1></div> Nullam bibendum mi dapibus, pretium mauris non, porttitor nisl. Quisque mollis tempus semper. Etiam convallis vehicula neque, sit amet mollis nibh posuere vel. Aenean viverra arcu id congue dignissim. Mauris diam lorem, condimentum vel diam quis, dapibus sollicitudin ligula. Fusce sed luctus ante. Sed sit amet eros tempor, sollicitudin erat id, luctus leo. Curabitur eget aliquet dui, et sollicitudin turpis. Aenean eget molestie risus, eu pulvinar lorem. Aliquam sed velit dolor. Curabitur vel elit felis. Nam viverra dui nisi, quis dictum massa euismod ac. Proin sit amet tempus elit. Donec sit amet arcu ornare, vehicula quam id, condimentum nisi. Donec fringilla quis lorem in condimentum. </p> <p> <div class="page-header"><h1>Skills</h1></div> In vulputate pretium risus, in pharetra libero tempor et. Fusce posuere orci quis dolor sodales interdum. Sed ultricies sodales purus, at consequat tellus tristique non. Integer id arcu ut nisi egestas interdum a sed neque. Nam ut leo ut odio porta finibus id nec dui. Suspendisse potenti. Mauris eros urna, ullamcorper a luctus interdum, varius quis tortor. Praesent imperdiet, enim at egestas vulputate, lectus sem varius quam, vitae dapibus mauris leo non lacus. </p> <p> <div class="page-header"><h1>Hobbies</h1></div> Morbi at commodo risus. Quisque ornare vel velit sed euismod. Fusce pharetra commodo urna, tincidunt mattis odio elementum vel. Proin eget facilisis magna. Vestibulum et dui quis sem auctor malesuada. Sed nec est viverra, placerat arcu et, lobortis lectus. Quisque ac metus semper, dapibus lorem nec, fermentum augue. Nullam fringilla pellentesque lacus in tempor. Suspendisse gravida fringilla nulla ac venenatis. Nulla elementum feugiat sollicitudin. </p>',
  contact : '<div class="page-header"><h1>Contact Mike</h1></div> <div class="row"> <div class="col-lg-4 contact-grid"> <h2>Phone:</h2> <h3><strong>360-936-8442</strong></h3> </div> <div class="col-lg-4 contact-grid"> <h2>Email:</h2> <h3><a href="mailto:mike@eggborne.com"><strong>mike@eggborne.com</strong></a></h3> </div> <div class="col-lg-4 contact-grid"> <h2>GitHub:</h2> <h3><a href="https://www.github.com/eggborne"><strong>github.com/eggborne</strong></a></h3> </div> </div>'
}
function fillProjectCards() {
  var projectList = Object.keys(projectData)
  for (var p=0;p<projectList.length;p++) {
    var currentProjectData = projectData[projectList[p]]
    var screenshotPath = currentProjectData.screenshots[0].length > 2 ? currentProjectData.screenshots[0] : "img/placeholder.png"
    var displayName = currentProjectData.displayName
    var targetColumnID = (p%2===0) ? "column1" : "column2"
    var projectID = "project"+p
    var repoURL = "https://www.github.com/eggborne/"+currentProjectData.repo
    var targetDiv = document.getElementById(targetColumnID)
    targetDiv.innerHTML += '<div id="'+projectID+'" class="post panel panel-success"><div class="panel-heading" style="background:'+currentProjectData.bgColor+'"><h2 class="panel-title"><a href="'+currentProjectData.url+'"><h3>'+displayName+'</h3></a></h2></div><div class="panel-body"><img class="thumbnail screenshot" src="'+screenshotPath+'" alt="'+displayName+' screenshot"><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandOnClick(`project-description-`,`'+p+'`)" id="desc-button-'+p+'">Expand</button></div><p><ul class="collapsed" id="project-description-'+p+'"></ul></p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4><button style="background:lightgreen" class="btn btn-default" onclick="expandOnClick(`tech-list-`,`'+p+'`)" id="tech-button-'+p+'">Expand</button></div><ul class="collapsed" id="tech-list-'+p+'"></ul></div><div class="panel-footer"><div class="row"><div class="col-sm-6"><span"><a href="'+currentProjectData.url+'"><img class="left-icon"src="img/websiteicon.png">Website</a></span></div><div class="col-sm-6"><span style="float:right"><a href="'+repoURL+'">Github<img class="right-icon"src="img/githubicon.png"></a></span></div></div></div></div>'
    // fill descriptions
    var descriptionList = document.getElementById("project-description-"+p)
    for (var d=0;d<currentProjectData.descriptionBullets.length;d++) {
      var currentBullet = currentProjectData.descriptionBullets[d]
      if (currentBullet.length) {
        descriptionList.innerHTML += '<li>'+currentBullet+'</span></li>'
      }
    }
    // fill tech lists
    var techList = document.getElementById("tech-list-"+p)
    for (var t=0;t<currentProjectData.techBullets.length;t++) {
      var currentTechBullet = currentProjectData.techBullets[t]
      techList.innerHTML += '<li class="tech-bullet"><span class="label label-success">'+currentTechBullet+'</span></li>'
    }
  }
}
function toggleBarButton(button) {
  button.classList.remove('btn-default')
  button.classList.add('btn-success')
  var barButtonArray = document.getElementsByClassName("bar-button")
  for (var b=0;b<barButtonArray.length;b++) {
    var currentButton = barButtonArray[b]
    if (currentButton !== button) {
      currentButton.classList.remove('btn-success')
      currentButton.classList.add('btn-default')
    }
  }
}
function expandOnClick(sectionID,index) {
  var section = document.getElementById(sectionID+index)
  if (sectionID[0]==="p") {
    var button = document.getElementById("desc-button-"+index)
  } else {
    var button = document.getElementById("tech-button-"+index)
  }
  if (section.classList.contains("collapsed")) {
    section.classList.remove("collapsed")
    button.innerHTML = "Collapse"
  } else {
    section.classList.add("collapsed")
    button.innerHTML = "Expand"
  }
}
function loadSection(section) {
  if (section==="projects") {
    // this only occurs on initial page load
    document.getElementById("gallery").innerHTML = sectionBodies[section]
    document.getElementById("gallery").style.transform = "translateX(0)"
    toggleGallery("on")
  } else {
    document.getElementById("page-body").innerHTML = sectionBodies[section]
  }
  currentPage = Object.keys(sectionBodies).indexOf(section)
}
function toggleGallery(setting) {
  var galleryDiv = document.getElementById("gallery")
  console.log("toggling " + setting)
  if (setting==="on" || galleryDiv.style.opacity===0) {
    console.log("showing gallery")
    galleryDiv.style.position = "initial"
    galleryDiv.style.opacity = 1
    galleryDiv.style.transform = "translateX(0)"
  } else {
    galleryDiv.style.opacity = 0
    galleryDiv.style.transform = "translateY(100vh)"
    setTimeout(function(){
      galleryDiv.style.position = "fixed"
    },200)
    
  }
  console.log(galleryDiv)
}