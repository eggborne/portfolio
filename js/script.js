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
    console.log("putting in column " + targetColumnID + " with ID " + projectID)
    var targetDiv = document.getElementById(targetColumnID)
    targetDiv.innerHTML += '<div id="'+projectID+'" class="post panel panel-success"><div class="panel-heading" style="background:'+currentProjectData.bgColor+'"><h2 class="panel-title"><a href="'+currentProjectData.url+'"><h3>'+displayName+'</h3></a></h2></div><div class="panel-body"><img class="screenshot" src="'+screenshotPath+'" alt="'+displayName+' screenshot"><div style="margin: 20px 0 15px 0" class="page-header"><h4>Description:</h4></div><p class="project-description"><ul class="description-bullets"></ul></p><br><div style="margin: 20px 0 15px 0" class="page-header"><h4>Technologies used:</h4></div><ul class="tech-bullets"></ul></div><div class="panel-footer"><div class="row"><div class="col-md-4"><span style="float:left"><a href="#">Website link</a></span></div><div class="col-md-5"></div><div class="col-md-3"><span style="float:right"><a href="#">Github link</a></span></div></div></div></div>'
    console.log(targetDiv)
    var descriptionList = document.getElementsByClassName("description-bullets")[document.getElementsByClassName("description-bullets").length-1]
    for (var d=0;d<currentProjectData.descriptionBullets.length;d++) {
      var currentBullet = currentProjectData.descriptionBullets[d]
      if (currentBullet.length) {
        descriptionList.innerHTML += '<li>'+currentBullet+'</li>'
      }
    }
    var techList = document.getElementsByClassName("tech-bullets")[document.getElementsByClassName("tech-bullets").length-1]
    console.log("found " + document.getElementsByClassName("tech-bullets").length + " tech lists")
    console.log(currentProjectData.techBullets.length + " bullets for " + displayName)
    console.log("adding to")
    console.log(techList)
    for (var t=0;t<currentProjectData.techBullets.length;t++) {
      var currentTechBullet = currentProjectData.techBullets[t]
      console.log("about to add "+currentTechBullet+" to tech list for " + displayName)
      // doesn't add them correctly!!
      techList.innerHTML += '<li>'+currentTechBullet+'</li>'
    }
  }
}
