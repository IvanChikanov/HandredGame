class Application
{
    static mainGrid;
    static leftPanelGrid;
    static userSpaceGrid;
    static upBack;
    static insideLeftInfoPanel;
    static qText;
    static qPanel;
    static answersBlock;
    static worker;
    static submitAnswer;
    static hints = {fifty: true, phone: true, humans: true, lastChance: true};
    static async Init()
    { 
        this.mainGrid = document.querySelector(".main-grid");
        this.leftPanelGrid = document.querySelector(".leftPanelGrid");
        this.userSpaceGrid = document.querySelector(".userSpace");
        this.answersBlock = document.getElementById("answers");
        Resizer.Init();
        this.upBack = document.getElementById("upBackground");
        this.upBackStyle();
        this.questBack();
        this.userSpaceLoad();
    }
    static upBackStyle()
    {
        this.upBack.style.background = "linear-gradient(90deg, rgba(255, 148, 50, 1), rgba(255, 181, 70, 1))";
        this.upBack.style.padding = "2px";
        this.upBack.style.borderRadius = "1rem";
        this.loadHelpsButtons();
    }
    static loadHelpsButtons()
    {
        let svgsSrcs = ["fifty", "phone", "friends", "refresh"];
        let svgNotifications = ["Убрать два ответа", "Подсказка", "Что думают люди", "Вторая попытка"];
        let helpPanel = document.getElementById("helpPanel");
        for(let i = 0; i < 4; i++)
        {
            let borderDiv = document.createElement("DIV");
            borderDiv.id = svgsSrcs[i];
            borderDiv.style = "width: 20%; height: 50%; padding: 2px; background: linear-gradient(90deg, rgba(255, 181, 70, 1), rgba(63, 140, 255, 1)); box-shadow: 0 2px 4px 2px rgba(134, 188, 252, 1);";
            let exampleButton = document.createElement("DIV");
            exampleButton.style = "background:radial-gradient(circle at 50% 106%, rgba(134, 188, 252, 1), rgba(12, 110, 214, 1) 70%);  border: 2px; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;";
            let svg = document.createElement("IMG");
            svg.src = `./media/${svgsSrcs[i]}.svg`;
            svg.style = "max-width: 80%; max-height:50%;";
            exampleButton.appendChild(svg);
            borderDiv.appendChild(exampleButton);
            helpPanel.appendChild(borderDiv);
            borderDiv.style.borderRadius = `${borderDiv.clientHeight / 2}px`;
            exampleButton.style.borderRadius = `${exampleButton.clientHeight / 2}px`;
            exampleButton.addEventListener("mouseover", ()=>{
                if(!document.getElementById("notify"))
                {
                let not = document.createElement("div");
                not.id = "notify";
                not.innerText = svgNotifications[i];
                document.body.appendChild(not);
                not.style = `position:absolute; top: ${exampleButton.getBoundingClientRect().top - (not.clientHeight + 10)}px; border-radius: ${not.clientHeight / 2}px; border: 1px solid rgba(63, 140, 255, 1); font-size: 1rem; font-weight: 500; background: white; padding: 5px;`;
                not.style.left = exampleButton.getBoundingClientRect().left - ((not.getBoundingClientRect().width - exampleButton.clientWidth) / 2) + "px";
                }
            });
            exampleButton.addEventListener("mouseleave", ()=>{
                document.body.removeChild(document.getElementById("notify"));
            });
            exampleButton.onmouseover = MouseEvents;
        }
    function  MouseEvents(e)
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
    static questBack()
    {
        let questBack = document.getElementById("questionBackground");
        questBack.style.background = "linear-gradient(90deg ,#3F8CFF, #4FA2D6, #61B9A9)";
        questBack.style.borderRadius = "1rem";
        questBack.style.padding = "1px";
        this.insideLeftInfoPanel = document.createElement("div");
        this.insideLeftInfoPanel.style.background = "rgba(240, 247, 255, 1)";
        this.insideLeftInfoPanel.style.borderRadius = ".9rem";
        this.insideLeftInfoPanel.style.width = "100%";
        this.insideLeftInfoPanel.style.height = "100%";
        questBack.appendChild(this.insideLeftInfoPanel);
        // Отсюда начнем загружать количество вопросов в инфо панель слева!
    }
    static userSpaceLoad()
    {
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
        this.qText = document.getElementById("qText");
        this.qText.innerHTML = null;
        this.qPanel = document.createElement("div");
        this.qPanel.style.width = "90%";
        this.qPanel.style.height = "90%";
        this.qPanel.style.background = "linear-gradient(90deg ,#3F8CFF, #4FA2D6, #61B9A9)";
        this.qPanel.style.borderRadius = ".8rem";
        this.qPanel.style.boxShadow = "0 0 14px rgba(63, 140, 255, 1)";
        this.qPanel.style.color = "white";
        this.qPanel.style.fontWeight = "500";
        this.qPanel.style.display = "flex";
        this.qPanel.style.alignItems = "center";
        this.qPanel.style.justifyContent = "center";
        this.qPanel.style.padding = "12px";
        this.qText.appendChild(this.qPanel);
        Resizer.answersBlockCut();
        this.worker = new Worker();
    }
}