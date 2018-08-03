function fillProjectCards() {
  var projectList = Object.keys(projectData)
  console.log(projectList)
  for (var p=0;p<projectList.length;p++) {
    var currentProjectData = projectData[projectList[p]]
    var screenshotPath = currentProjectData.screenshots[0].length > 2 ? currentProjectData.screenshots[0] : "img/placeholder.png"
    var displayName = currentProjectData.displayName
    console.log("current project is " + currentProjectData.shortName)
    var targetColumnID = (p%2===0) ? "column1" : "column2"
    var projectID = "project"+p
    var repoURL = "https://github.com/eggborne/"+currentProjectData.repo
    console.log("putting in column " + targetColumnID + " with ID " + projectID)
    var targetDiv = document.getElementById(targetColumnID)
    targetDiv.innerHTML += '<div id="'+projectID+'" class="post panel panel-success"><div class="panel-heading" style="background:'+currentProjectData.bgColor+'"><h2 class="panel-title"><a href="'+currentProjectData.url+'"><h3>'+displayName+'</h3></a></h2></div><div class="panel-body"><img class="screenshot" src="'+screenshotPath+'" alt="'+displayName+' screenshot"><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4><button onclick="expandOnClick(`desc`,'+p+')" id="desc-button-'+p+'">Expand</button></div><p><ul class="collapsed" id="project-description-'+p+'"></ul></p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4><button onclick="expandOnClick(`tech`,'+p+')" id="tech-button-'+p+'">Expand</button></div><ul class="collapsed" id="tech-list-'+p+'"></ul></div><div class="panel-footer"><div class="row"><div class="col-sm-6"><span"><a href="'+currentProjectData.url+'"><img class="left-icon"src="img/websiteicon.png">Website</a></span></div><div class="col-sm-6"><span style="float:right"><a href="'+repoURL+'">Github<img class="right-icon"src="img/githubicon.png"></a></span></div></div></div></div>'
    // fill descriptions
    var descriptionList = document.getElementById("project-description-"+p)
    for (var d=0;d<currentProjectData.descriptionBullets.length;d++) {
      var currentBullet = currentProjectData.descriptionBullets[d]
      console.log("adding bullet " + currentBullet)
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
    // define actions for expand buttons
    var descButton = document.getElementById("desc-button-"+p)
    descButton.style.background = "#afa"
    descButton.click = function() {

    }
    var techButton = document.getElementById("tech-button-"+p)
    descButton.style.background = "#aaf"
    descButton.click = function() {
      console.log("clicked tech expand")
    }


    // .classList.remove("collapsed")

  }
}
function expandOnClick(list,listIndex) {
  console.log("clicked " + list + " expand, index " + listIndex)
}
