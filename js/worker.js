class Worker
{
    qBar;
    mapControl;
    activeQuestion;
    submitAnswer;
    endGameButton;
    static selectedButton;
    infoButton;
    hintsButton = [document.getElementById("fifty"), document.getElementById("phone"), document.getElementById("friends"),document.getElementById("refresh")];
    constructor()
    {
        this.infoButton = document.querySelector(".infoButton");
        this.infoButton.onclick = ()=>
        {
            let textArray = this.#createDiv("", "");
            for(let i = 0; i < infoText.length; i++)
            {
                let p = document.createElement("span");
                p.style.fontWeight = "500";
                p.style.fontSize = "1rem";
                p.innerHTML = infoText[i];
                let term = this.#createDiv("", "width: 100%; height: 2px; background: rgb(210, 233, 240); margin-block: 5px;");
                textArray.appendChild(p);
                if(i != infoText.length - 1)
                    textArray.appendChild(term);
            }
            this.popuper("Правила игры", textArray.outerHTML);
        };
        this.submitAnswer = document.getElementById("submitAnswer");
        this.submitAnswer.classList.add("submit");
        this.submitAnswer.style.borderRadius = `${this.submitAnswer.clientHeight/2}px`;
        this.endGameButton = document.getElementById("end");
        this.endGameButton.style.borderRadius = `${this.endGameButton.clientHeight/2}px`;
        this.endGameButton.onclick = this.endGame.bind(this);
        this.selectedButton = null;
        this.mapControl = new Map();
        this.qBar = document.getElementById("questionBar");
        for(let i = 0; i < Data.length; i++)
        {
            let text = document.createElement("DIV");
            let inside = document.createElement("DIV");
            inside.style = "display:grid; max-width: 40%; min-width: 20%; height: 80%; grid-template-columns: 1fr 12px 1px 12px 1fr;";
            let background = this.#createDiv("","grid-area:1/1/1/6;border-radius: .3rem; padding: 1px; background: linear-gradient(90deg, rgba(255, 181, 70, 1),rgba(63, 140, 255, 1));opacity: 0;");
            let insideBacground = this.#createDiv("","background:linear-gradient(90deg, rgba(63, 140, 255, 1),rgba(97, 185, 169, 1));width:100%; height:100%; border-radius: .2rem;");
            background.appendChild(insideBacground);
            inside.appendChild(background);
            let nText = this.#createDiv(Data[i].number, `text-align:right; display:flex; align-items:center; justify-content: flex-end; grid-area: 1/1/1/2; font-weight: 500; ${Data[i].noFire?"color:rgba(255, 121, 11, 1)":""}`);
            inside.appendChild(nText);
            inside.appendChild(this.#createDiv("", "grid-area: 1/3/1/3; background:#D2E9F0; opacity: 20%; margin-block: 3px;"));
            let pText = this.#createDiv(Data[i].points, `padding-right:6px; display:flex; align-items:center; justify-content: flex-start;grid-area: 1/5/1/5; font-weight: 600; ${Data[i].noFire?"color:rgba(255, 121, 11, 1)":""}`);
            inside.appendChild(pText);
            text.style = 'width: 90%; display: flex; align-items:center; justify-content: center; height: 7%;';
            text.appendChild(inside);
            this.qBar.appendChild(text);
            if(i != 0)
            {
                text.style.borderBottom = "1px solid #D2E9F0";
            }
            this.mapControl.set(Data[i].number, {background: background, numberText: nText, pointText: pText, text: Data[i].text, answers: Data[i].answers, hint: Data[i].hint, fire: Data[i].noFire, points: Data[i].points});
        }
        this.activeQuestion = 1;
        this.loadQuestion();
    }
    #createDiv(inner, style = undefined)
    {
        let div = document.createElement("DIV");
        div.innerText = inner;
        if(style)
        {
            div.style = style;
        }
        return div;
    }
    incrementQuest()
    {
        if(this.activeQuestion < this.mapControl.size)
        {
            this.activeQuestion++;
            this.loadQuestion();
        }
        else
        {
            this.endGameButton.dispatchEvent(new Event("click"));
        }
    }
    loadQuestion()
    {
        Variants.allButtons = [];
        Variants.selected = null;
        if(this.activeQuestion > 1)
        {
            this.mapControl.get(this.activeQuestion - 1).background.style.opacity = "0";
        }
        Application.qPanel.innerHTML = "";
        let span = document.createElement("SPAN");
        span.innerText = this.mapControl.get(this.activeQuestion).text;
        Application.qPanel.appendChild(span);
        if(span.clientHeight > Application.qPanel.clientHeight - (Application.qPanel.clientHeight / 100 * 10))
        {   
            let size = (Application.qPanel.clientHeight - (Application.qPanel.clientHeight / 100 * 10)) / span.clientHeight * 100;
            span.style.fontSize = size + "%";
            if(size < 90)
            {
                span.style.fontWeight = "500";
            }
        }
        this.mapControl.get(this.activeQuestion).background.style.opacity = "100%";
        this.mapControl.get(this.activeQuestion).numberText.style.color = "#D2E9F0";
        this.mapControl.get(this.activeQuestion).pointText.style.color = "#D2E9F0";
        Application.answersBlock.innerHTML = "";
        this.shuffle(this.mapControl.get(this.activeQuestion).answers);
        Application.answersBlock.appendChild(this.createAnswer("A", this.mapControl.get(this.activeQuestion).answers[0]));
        Application.answersBlock.appendChild(this.createAnswer("Б", this.mapControl.get(this.activeQuestion).answers[1]));
        Application.answersBlock.appendChild(this.createAnswer("В", this.mapControl.get(this.activeQuestion).answers[2]));
        Application.answersBlock.appendChild(this.createAnswer("Г", this.mapControl.get(this.activeQuestion).answers[3]));
        let size = null;
        for(let v of Variants.allButtons)
        {
            if(size == null)
            {
                size = v.variant.clientHeight;
            }
            else if(size < v.variant.clientHeight)
            {
                size = v.variant.clientHeight;
            }
        }
        Variants.oneSize(size);
        this.submitAnswer.onclick = this.checkAnswer.bind(this);
        if(Application.hints.fifty)
            document.getElementById("fifty").onclick = Variants.fiftys;
        if(Application.hints.phone)
        {
        document.getElementById("phone").onclick = ()=>{this.popuper("Подсказка",this.mapControl.get(this.activeQuestion).hint);Application.hints.phone = false;};
        }
        else
        {
            document.getElementById("phone").onclick = null;
            document.getElementById("phone").style.opacity = "20%";
        }
        if(Application.hints.humans)
        {
            document.getElementById("friends").onclick = ()=>{
                let friendDiv = this.#createDiv("", "display:grid; grid-template-columns: 50px 200px; grid-template-rows: repeat(4, 50px);width: 100%; align-items:center; justify-items: center; gap: 4px;");
                let liters = ["А", "Б", "В", "Г"];
                for(let i = 0; i < Variants.allButtons.length; i++)
                {
                    let l = this.#createDiv(liters[i], "display:flex; align-items: center; justify-content: center; background: rgba(63, 140, 255, 1);width: 100%; height: 100%; border-radius: .2rem; color: white; font-size: 2rem; font-weight:600;");
                    let p = this.#createDiv(`${Variants.allButtons[i].info.percent}%`, `background: linear-gradient(90deg, rgba(208, 230, 255, 1)  ${Variants.allButtons[i].info.percent}%, rgba(240, 247, 255, 1) ${Variants.allButtons[i].info.percent}%);width: 100%; height: 100%; border-radius: .2rem; border:2px solid rgba(63, 140, 255, 1); box-sizing: border-box;color: rgba(12, 110, 214, 1); display: flex; align-items:center; padding-left: 10px;`);                  
                    friendDiv.appendChild(l);
                    friendDiv.appendChild(p);
                }
                this.popuper("Что думают люди", friendDiv.outerHTML);
                Application.hints.humans = false;
            };
        }
        else
        {
            document.getElementById("friends").onclick = null;
            document.getElementById("friends").style.opacity = "20%";
        }

    }
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
    }
    createAnswer(liter, answer)
    {
        let answerGrid = this.#createDiv("", "display: grid; grid-template-columns: 50px 1fr; width: 100%; min-height:50px;align-self:center; gap:2px;");
        let litBorder = this.#createDiv("", "padding: 2px; background: linear-gradient(90deg, rgba(255, 181, 70, 1),rgba(63, 140, 255, 1)); border-radius: .3rem; width: 50px; height: 50px;align-self: center; box-sizing:border-box;");
        let lit = this.#createDiv(liter, "display:flex; align-items: center; justify-content: center; background: rgba(63, 140, 255, 1);width: 100%; height: 100%; border-radius: .2rem; color: white; font-size: 2rem; font-weight:600;");
        litBorder.appendChild(lit);
        answerGrid.appendChild(litBorder);
        let textBorder =  this.#createDiv("", "padding: 2px; background: linear-gradient(90deg, rgba(255, 181, 70, 1),rgba(63, 140, 255, 1)); border-radius: .3rem; cursor:pointer;");
        let text = this.#createDiv(answer.text, "display:flex; align-items: center; justify-content: flex-start; background: rgba(12, 110, 214, 1);width: 100%; height: 100%; border-radius: .2rem; color: white; padding: 5px; box-sizing:border-box;");
        textBorder.appendChild(text);
        answerGrid.appendChild(textBorder);
        new Variants(text, answer, [litBorder, lit, textBorder]);
        return answerGrid;
    }
    checkAnswer()
    {
        if(Variants.selected)
        {
            if(Variants.selected.info.right)
            {
                Variants.selected.colored();
                this.submitAnswer.onclick = null;
                setTimeout(()=>{this.incrementQuest(); this.submitAnswer.onclick = this.checkAnswer.bind(this);}, 2000);
            }
            else
            {
                for(let v of Variants.allButtons)
                {
                    v.variant.onclick = null;

                }
                if(Application.hints.lastChance)
                {
                    document.getElementById("refresh").onclick = ()=>{this.loadQuestion(); Application.hints.lastChance = false; document.getElementById("refresh").onclick = null; document.getElementById("refresh").style.opacity = "20%";};
                }
                Variants.selected.colored();
            }
        }
    }
    endGame(e)
    {
        let point = this.getPoints(e.isTrusted);
        let data = this.loadCongandulation(point);
        let endGrid = this.#createDiv("", `display:grid; grid-template-rows: repeat(3, 2fr); align-items: center; justify-items:center; width: ${Application.userSpaceGrid.clientWidth}px; height: ${Application.userSpaceGrid.clientHeight}px`);
        let points = this.#createDiv(`${point} ${data.pTex}`, " background: white; padding-block: 1rem; padding-inline: 1.3rem; font-size: 2rem; font-weight: 600; color: rgba(63, 140, 255, 1); border: 2px solid rgba(255, 148, 50, 1);");
        endGrid.appendChild(points);
        let text = this.#createDiv(data.text, "padding-inline: 40px; font-size: 1.5rem; text-align: center;");
        endGrid.appendChild(text);
        let cat = document.createElement("IMG");
        cat.src = `./media/${data.image}.svg`;
        endGrid.appendChild(cat);
        Application.userSpaceGrid.parentNode.replaceChild(endGrid, Application.userSpaceGrid);
        points.style.borderRadius = points.clientHeight / 2 + "px";
        for(let button of this.hintsButton)
        {
            button.style.opacity = "20%";
            button.onclick = null;
        }
    }
    loadCongandulation(point)
    {
        let data = {
            image: null,
            text: null,
            pTex: "балл"
        };
        if(point >= 0 && point <= 4)
        {
            data.text = "Повтори материал по этой теме и попробуй пройти игру еще раз. У тебя все обязательно получится!";
            data.image = "low";
            if(point == 0)
            {
                data.pTex += "ов";
            }
            else if(point >= 2 && point <= 4)
            {
                data.pTex += "а";
            }
        }
        else if(point >= 5 && point <= 25)
        {
            data.text = "Неплохо, но ты можешь лучше! Не останавливайся на достигнутом!";
            data.image = "low-middle";
            data.pTex += "ов";
        }
        else if(point >= 30 && point <= 85)
        {
            data.text = "Хороший результат! Продолжай в том же духе!";
            data.image = "middle";
            data.pTex += "ов";
        }
        else if(point == 100)
        {
            data.text = "Молодец! Ты знаешь ответы на все вопросы!";
            data.image = "high";
            data.pTex += "ов";
        }
        return data;
    }
    getPoints(userFinal)
    {
        if(userFinal)
        {
            return this.activeQuestion == 1? 0 : this.activeQuestion-1;
        }
        else
        {
            for(let i = this.activeQuestion; i > 0; i--)
            {
                if(this.mapControl.get(i).fire)
                {
                    return this.mapControl.get(i).points;
                }
            }
        }
    }
    getPrizes(point)
    {

    }
    popuper(head, insideHTML)
    {
        let father = this.#createDiv("","position: fixed; width:100%; height:100%; background: rgba(0,0,0, 0.4); display:flex; align-items: center; justify-content:center; z-index: 500;");
        let borderPopup = this.#createDiv("","padding: 1px; background:linear-gradient(90deg, rgba(255, 181, 70, 1),rgba(63, 140, 255, 1)); z-index: 600; border-radius: 1rem; max-width: 60%; min-width: 300px; max-height: 60%; box-sizing:border-box;");
        let popup = this.#createDiv("", "max-width:100%; height:100%; border-radius: .9rem; background: white; padding: 5px; display: grid; grid-template-columns: 40px 5fr 40px; grid-template-rows: 1fr auto;align-items: center;justify-items: center;");
        let h3 = document.createElement("h3");
        h3.innerText = head;
        h3.classList.add("popupH3");
        popup.appendChild(h3);
        let closeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        closeSvg.setAttribute("width","34");
        closeSvg.setAttribute("height","34");
        closeSvg.setAttribute("viewBox","0 0 68 68");
        closeSvg.style.gridArea = "1/3/1/3";
        closeSvg.innerHTML = `<circle cx="34" cy="34" r="33" fill="white" id="fillers" stroke="url(#paint0_linear_6_6833)" stroke-width="2"/><path d="M24 44L43 25" stroke="url(#paint1_linear_6_6833)" stroke-width="4" stroke-linecap="round"/>
        <path d="M24 25L43 44" stroke="url(#paint2_linear_6_6833)" stroke-width="4" stroke-linecap="round"/><defs><linearGradient id="paint0_linear_6_6833" x1="34" y1="-2.16385e-05" x2="71.0376" y2="2.60155" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB546"/><stop offset="1" stop-color="#3F8CFF"/></linearGradient><linearGradient id="paint1_linear_6_6833" x1="24.8137" y1="43.8934" x2="43.1457" y2="25.5614" gradientUnits="userSpaceOnUse"><stop stop-color="#3F8CFF"/><stop offset="1" stop-color="#61B9A9"/></linearGradient><linearGradient id="paint2_linear_6_6833" x1="24.1066" y1="25.8137" x2="42.4386" y2="44.1457" gradientUnits="userSpaceOnUse"><stop stop-color="#3F8CFF"/><stop offset="1" stop-color="#61B9A9"/></linearGradient></defs>`;
        closeSvg.style.zIndex = "550";
        popup.appendChild(closeSvg);
        borderPopup.appendChild(popup);
        father.appendChild(borderPopup);
        document.body.appendChild(father);
        closeSvg.onclick = ()=>{document.body.removeChild(father);};
        closeSvg.onmouseover = ()=>{document.getElementById("fillers").setAttribute("fill", "rgba(240, 247, 255, 1)");};
        closeSvg.onmouseleave = ()=>{document.getElementById("fillers").setAttribute("fill", "white");};
        let contentDiv = this.#createDiv("", "grid-area:2/2/3/2; padding-bottom: 14px;");
        contentDiv.innerHTML = insideHTML;
        popup.appendChild(contentDiv);
    }
}
class Variants
{
    static allButtons = [];
    static selected;
    idFrames;
    variant;
    percent;
    func;
    stop;
    info;
    toPaint;
    constructor(variantElement, info , arr)
    {
        this.info = info;
        this.stop = false;
        this.percent = 100;
        this.variant = variantElement;
        this.variant.onmouseover = this.over.bind(this);
        this.variant.onmouseleave = this.leave.bind(this);
        this.variant.onclick = this.click.bind(this);
        Variants.allButtons.push(this);
        this.toPaint = arr;
    }
    over()
    {
        this.stop = true;
        this.func = (d)=>
        {
            if(d > 20)
            {
                return d - 4;   
            }
            else
            {
                this.stop = false;
                return 20;
            }
        };
        cancelAnimationFrame(this.idFrames);
        this.idFrames = requestAnimationFrame(this.animation.bind(this));
    }
    leave()
    {
        this.stop = true;
        this.func = (d)=>
        {
            if(d < 100)
            {
                return d + 4;   
            }
            else
            {
                this.stop = false;
                return 100;
            }
        };
        cancelAnimationFrame(this.idFrames);
        this.idFrames = requestAnimationFrame(this.animation.bind(this));
    }
    click()
    {

        cancelAnimationFrame(this.idFrames);
        Variants.unselect();
        Variants.selected = this;
        this.variant.style.background = "linear-gradient(90deg, rgba(255, 148, 50, 1) 20%, rgba(255, 181, 70, 1))";
        this.variant.onmouseover = null;
        this.variant.onmouseleave = null;
    }
    animation()
    {
        if(this.stop)
        {

            this.percent = this.func(this.percent);
            this.variant.style.background = `linear-gradient(-90deg, rgba(12, 110, 214, 1) ${this.percent}%, rgba(97, 185, 169, 1))`;
            this.idFrames = requestAnimationFrame(this.animation.bind(this));
        }
        else
        {
            cancelAnimationFrame(this.idFrames);
        }
    }
    static unselect()
    {
        if(Variants.selected)
        {
            Variants.selected.variant.style.background = "linear-gradient(-90deg, rgba(12, 110, 214, 1) 100%, rgba(97, 185, 169, 1))";
            Variants.selected.variant.onmouseover = Variants.selected.over.bind(Variants.selected);
            Variants.selected.variant.onmouseleave = Variants.selected.leave.bind(Variants.selected);
            Variants.selected.variant.onclick = Variants.selected.click.bind(Variants.selected);
            Variants.selected.percent = 100;
        }
    }
    colored()
    {
        for(let top of this.toPaint)
        {
            top.style.background = "rgba(255, 76, 37, 1)";
        }
        for(let trueAns of Variants.allButtons)
        {
            if(trueAns.info.right)
            {
                for(let top of trueAns.toPaint)
                {
                    top.style.background = "rgba(139, 215, 75, 1)";
                }
            }
        }
    }
    static fiftys(e)
    {
        let count = 0;
        while(count < 2)
        {
            for(let ans of Variants.allButtons)
            {
                if(!ans.info.right)
                {
                        let r = Math.random();
                        if(r < 0.5)
                        {
                            if(ans.variant.parentNode.parentNode.style.opacity == "")
                            {
                            count++;
                            ans.variant.parentNode.parentNode.style.opacity = "20%";
                            ans.variant.onclick = null;
                            break;
                            }
                        }                         
                }
            }
        }
        document.getElementById("fifty").style.opacity = "20%";
        document.getElementById("fifty").onclick = null;
        Application.hints.fifty = false;
    }
    static oneSize(size)
    {
        for(let v of Variants.allButtons)
        {
            v.variant.style.height = size + "px";
        }
    }
}
