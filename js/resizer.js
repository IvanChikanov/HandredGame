//window.addEventListener("load", Centring);
//window.addEventListener("resize", Centring);
/*function Centring()
{
    let mainGrid = document.querySelector(".main-grid");
    let cHeight = document.documentElement.clientHeight;
    let cWidth = document.documentElement.clientWidth;
    mainGrid.style.left = (cWidth - mainGrid.clientWidth) / 2 + "px";
    mainGrid.style.top = (cHeight - mainGrid.clientHeight) / 2 + "px";
    ToPixelSize(mainGrid);
}
function ToPixelSize(grid)
{
    let width = grid.clientWidth;
    let height = grid.clientHeight;
    grid.style.gridTemplateColumns = `${Math.round(width / 3)}px ${Math.round(width / 3 * 2)}px`;
    grid.style.gridTemplateRows = `${Math.round(height / 4)}px ${Math.round(height / 4 * 3)}px`;
    leftPanel();
    userSpace();
}
function leftPanel()
{
    let grid = document.querySelector(".leftPanelGrid");
    let oneUnit = grid.clientHeight / 100;
    grid.style.gridTemplateRows = `${oneUnit * 15}px ${oneUnit * 10}px ${oneUnit * 75}px`;
    grid.style.gridTemplateColumns = `${grid.clientWidth}px`;
    let upBack = document.getElementById("upBackground");
    upBack.style.background = "#ffffff";
    upBack.style.border = "2px solid orange";
    upBack.style.borderRadius = ".9rem";
    /*
    upBack.innerHTML = `<svg width="${upBack.clientWidth}" height="${upBack.clientHeight}" viewBox="0 0 ${upBack.clientWidth} ${upBack.clientHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="${upBack.clientWidth - 2}" height="${upBack.clientHeight - 2}" rx="1rem" fill="white" stroke="url(#paint0_linear_61_461)" stroke-width="2"/><defs><linearGradient id="paint0_linear_61_461" x1="13.1992" y1="81.4993" x2="539.039" y2="81.4993" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9432"/><stop offset="1" stop-color="#FFB546"/></linearGradient></defs></svg>`;
    loadHelpsButtons();
    let questBack = document.getElementById("questionBackground");
    questBack.innerHTML = `<svg width="${questBack.clientWidth}" height="${questBack.clientHeight}" viewBox="0 0 ${questBack.clientWidth} ${questBack.clientHeight}" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="${questBack.clientWidth - 1}" height="${questBack.clientHeight - 1}" rx="1rem" fill="#F0F7FF" stroke="url(#paint0_linear_61_463)"/><defs><linearGradient id="paint0_linear_61_463" x1="13.1992" y1="370.497" x2="539.039" y2="370.497" gradientUnits="userSpaceOnUse"><stop stop-color="#3F8CFF"/><stop offset="1" stop-color="#61B9A9"/></linearGradient></defs></svg>`;
}
function loadHelpsButtons()
{
    let svgsSrcs = ["./media/fifty.svg", "./media/phone.svg", "./media/friends.svg", "./media/refresh.svg"];
    let helpPanel = document.getElementById("helpPanel");
    helpPanel.innerHTML = null;
    for(let i = 0; i < 4; i++)
    {
        let borderDiv = document.createElement("DIV");
        borderDiv.style = "width: 20%; height: 50%; padding: 2px; background: linear-gradient(90deg, rgba(255, 181, 70, 1), rgba(63, 140, 255, 1));";
        let exampleButton = document.createElement("DIV");
        exampleButton.style = "background:radial-gradient(circle at 50% 106%, rgba(134, 188, 252, 1), rgba(12, 110, 214, 1) 70%);  border: 2px; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;";
        let svg = document.createElement("IMG");
        svg.src = svgsSrcs[i];
        svg.style = "max-width: 80%; max-height:50%;";
        exampleButton.appendChild(svg);
        borderDiv.appendChild(exampleButton);
        helpPanel.appendChild(borderDiv);
        borderDiv.style.borderRadius = `${borderDiv.clientHeight / 2}px`;
        exampleButton.style.borderRadius = `${exampleButton.clientHeight / 2}px`;
        exampleButton.onmouseover = MouseEvents;
}
function MouseEvents(e)
{
    if(e.target.tagName == "DIV")
    {
        requestAnimationFrame(function(){
            Animation(e.target, "rgba(255, 181, 70, 1)", 0);
        });
        e.target.onmouseover = null;
        e.target.onmouseleave = ()=>{
            requestAnimationFrame(function(){
                Animation(e.target, "rgba(134, 188, 252, 1)", 0);
            });
            e.target.onmouseover = MouseEvents;
        };
    }
}
function Animation(element, color, percent)
{
    percent += 5;
    if(percent <= 70)
    {
        element.style.background = `radial-gradient(circle at 50% 106%, ${color} , rgba(12, 110, 214, 1) ${percent}%)`;
        requestAnimationFrame(function (){
            Animation(element, color, percent);
        });
    }
    }
}
function userSpace()
{
    let grid = document.querySelector(".userSpace");
    let widthPercent = grid.clientWidth / 100;
    let heightPercent = grid.clientHeight /100;
    grid.style.gridTemplateColumns = `${widthPercent * 3}px ${widthPercent * 3}px ${widthPercent * 88}px ${widthPercent * 3}px ${widthPercent * 3}px`;
    grid.style.gridTemplateRows = `${heightPercent * 10}px ${heightPercent * 10}px ${heightPercent * 10}px ${heightPercent * 55}px ${heightPercent * 15}px`;
    let qBack = document.getElementById("qBack");
    qBack.innerHTML = null;
    let qBackPanelBorder = document.createElement("div");
    qBackPanelBorder.style = "border-radius: .6rem; width: 100%; height: 100%; padding: 1px; background: linear-gradient(rgba(255, 181, 70, 0.15) 40%, rgba(255, 148, 50, 1) );";
    qBackPanelBorder.style.boxShadow = "0 5px 10px rgba(134, 188, 252, 1)";
    let qBackPanel = document.createElement("div");
    qBackPanel.style.background = "#ECFFFE";
    qBackPanel.style.width = "100%";
    qBackPanel.style.height = "100%";
    qBackPanel.style.borderRadius = ".6rem";
    qBackPanelBorder.appendChild(qBackPanel);
    qBack.appendChild(qBackPanelBorder);
    let qText = document.getElementById("qText");
    qText.innerHTML = null;
    let qPanel = document.createElement("div");
    qPanel.style.width = "90%";
    qPanel.style.height = "90%";
    qPanel.style.background = "linear-gradient(90deg ,#3F8CFF, #4FA2D6, #61B9A9)";
    qPanel.style.borderRadius = ".8rem";
    qPanel.style.boxShadow = "0 0 14px rgba(63, 140, 255, 1)";
    qText.appendChild(qPanel);
*/
class Resizer
{
    static Init()
    {
        window.addEventListener("resize", ()=>{
            Resizer.Resize();
            Resizer.answersBlockCut(); });
        Resizer.Resize();
    }
    static Resize()
    {
        Resizer.Centring();
        Resizer.ToPixelSize(Application.mainGrid);
        Resizer.leftPanel();
        Resizer.userSpace();
    }
    static Centring()
    {
        let mainGrid = Application.mainGrid;
        let cHeight = document.documentElement.clientHeight;
        let cWidth = document.documentElement.clientWidth;
        mainGrid.style.left = (cWidth - mainGrid.clientWidth) / 2 + "px";
        mainGrid.style.top = (cHeight - mainGrid.clientHeight) / 2 + "px";
    }
    static ToPixelSize(grid)
    {
        let width = grid.clientWidth;
        let height = grid.clientHeight;
        grid.style.gridTemplateColumns = `${Math.round((width / 3) / 2) * 2}px ${Math.round(width / 3 * 2)}px`;
        grid.style.gridTemplateRows = `${Math.round(height / 4)}px ${Math.round(height / 4 * 3)}px`;
    }
    static leftPanel()
    {
        let grid = Application.leftPanelGrid;
        let oneUnit = grid.clientHeight / 100;
        grid.style.gridTemplateRows = `${Math.round(oneUnit * 15)}px ${Math.round(oneUnit * 10)}px ${Math.round(oneUnit * 75)}px`;
        grid.style.gridTemplateColumns = `${Math.round(grid.clientWidth)}px`;
    }
    static userSpace()
    {
        let grid = Application.userSpaceGrid;
        let widthPercent = grid.clientWidth / 100;
        let heightPercent = grid.clientHeight /100;
        grid.style.gridTemplateColumns = `${Math.round(widthPercent * 3)}px ${Math.round(widthPercent * 3)}px ${Math.round(widthPercent * 88)}px ${Math.round(widthPercent * 3)}px ${Math.round(widthPercent * 3)}px`;
        grid.style.gridTemplateRows = `${Math.round(heightPercent * 10)}px ${Math.round(heightPercent * 10)}px ${Math.round(heightPercent * 10)}px ${Math.round(heightPercent * 55)}px ${Math.round(heightPercent * 15)}px`;
    }
    static answersBlockCut()
    {
        Application.answersBlock.style.gridTemplateColumns = `${Application.answersBlock.clientWidth / 2}px ${Application.answersBlock.clientWidth / 2}px`;
        Application.answersBlock.style.gridTemplateRows = `${Application.answersBlock.clientHeight / 2}px ${Application.answersBlock.clientHeight / 2}px`;
    }
}