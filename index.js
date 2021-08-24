
const tabs = document.querySelectorAll('.features__tab')
const panels = document.querySelectorAll('.features__tabpanel')

/**
 * Handle tab click event
 * Show tabpanel of clicked tab
 * @param  {object} event
 */
const handleTabClick = (event) => {
    const tab = event.target
    const panelId = tab.getAttribute('aria-controls')

    selectTab(tab)
    showPanel(panelId)
}

/**
 * Hide all tabpanels
 */
const hidePanels = () => {
    for (let panel of panels) {
        panel.setAttribute('hidden', '');
    }
}

/**
 * Show tabpanel with id
 * @param  {string} id
 */
const showPanel = (id) => {
    hidePanels()

    const panel = document.querySelector(`#${id}`)
    panel.removeAttribute('hidden')
    panel.focus()
}

/**
 * Unselect all tabs
 */
const clearSelectedTabs = () => {
    for (let tab of tabs) {
        tab.setAttribute('aria-selected', false)
        tab.setAttribute('tab-index', -1)
    }
}

/**
 * Select tab
 * @param  {object} tab
 */
const selectTab = (tab) => {
    clearSelectedTabs()

    tab.setAttribute('aria-selected', true)
    tab.setAttribute('tab-index', 0)
}

for (let tab of tabs) {
    tab.addEventListener('click', handleTabClick)
}