const API_BASE_URL = "https://dice-roller-ij-node-cgeqatf5chevc5c6.centralus-01.azurewebsites.net"

// Wake Node.js server
async function wakeServer() {
    try {
        const response = await fetch(`${API_BASE_URL}/wakeAPI`)
        if (!response.ok) {
            throw new Error("Wake API request failed.")
        }
        const data = await response.json()
        console.log(data.message)
    } catch (error) {
        console.error("Wake API error:", error)
    }
}

// Roll dice using Node API
async function rollDice() {
    try{
        const [firstRollResponse, secondRollResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/randomDiceRoll`),
            fetch(`${API_BASE_URL}/randomDiceRoll`)
        ])
        if (!firstRollResponse.ok || !secondRollResponse.ok) {
            throw new Error("Dice API request failed.")
        }
        const firstRollData = await firstRollResponse.json()
        const secondRollData = await secondRollResponse.json()

        const firstRoll = firstRollData.number
        const secondRoll = secondRollData.number
        const total = firstRoll + secondRoll

        document.getElementById("firstRoll").value = firstRoll
        document.getElementById("secondRoll").value = secondRoll
        document.getElementById("total").value = total

    } catch (error) {
        console.error("Dice roll error:", error)
        document.getElementById("firstRoll").value = "Error"
        document.getElementById("secondRoll").value = "Error"
        document.getElementById("total").value = "Error"
    }
}

// Page setup
document.addEventListener("DOMContentLoaded", () => {
    wakeServer()
    rollDice()
    document.getElementById("rollButton").addEventListener("click", () => {
        rollDice()
    })
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            rollDice()
        }
    })
})
