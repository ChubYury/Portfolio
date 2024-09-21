export function tabsTrigger() {
 const tabsBlockList = [...document.getElementsByClassName('js-tabs-block')];
 
 if (!tabsBlockList.length) return;
 tabsBlockList.forEach(tabsBlock => {
  const triggersList = [...tabsBlock.getElementsByClassName('js-tab-trigger')];
  // const contentsBlocksList = [...tabsBlock.getElementsByClassName('js-tab-content')];
  
  triggersList.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
        const clickTrigger = trigger.dataset.trig
    });
    
  });
  
 });
 
 
};