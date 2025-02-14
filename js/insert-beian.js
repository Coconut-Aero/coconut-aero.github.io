document.addEventListener("DOMContentLoaded", function() {
    var beianElement = document.createElement('div');
    beianElement.style.textAlign = 'center';
    beianElement.style.fontSize = '14px';
    beianElement.style.marginTop = '20px';
  
    var beianText = document.createTextNode('萌ICP备20250702号');
    var beianLink = document.createElement('a');
    beianLink.href = "https://icp.gov.moe/?keyword=20250702";
    beianLink.target = "_blank";
    beianLink.appendChild(beianText);
  
    beianElement.appendChild(beianLink);
    
    document.body.appendChild(beianElement);
  });
  