// JS File
const output = document.getElementById("term-output");
const inputText = document.getElementById("term-input");
const hiddenInput = document.getElementById("hidden-input");
const terminal = document.getElementById("terminal");
const promptSpan = document.querySelector(".prompt");

// state: current "user"
let currentUser = "max";

// state: current "desc"
let desc = "Python/JS dev with a Software Engineering Degree (BSc), crypto and Linux enthusiast."

// helpers for prompt
function getPrompt() {
    return `${currentUser}@terminal:~$`;
}

function getDesc(){
    return desc;
}

function updateDesc(text){
    desc = text;
}

function updatePromptSpan() {
    promptSpan.textContent = getPrompt();
}

// initialize prompt text
updatePromptSpan();

// focus on click
terminal.addEventListener("click", () => {
    hiddenInput.focus();
});

hiddenInput.addEventListener("input", () => {
    inputText.textContent = hiddenInput.value;
});

hiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const command = hiddenInput.value;
        runCommand(command);
        hiddenInput.value = "";
        inputText.textContent = "";
    }
});

// Command processor
function runCommand(rawCmd) {
    const cmd = rawCmd.trim();

    // echo the prompt + command the user typed
    appendOutput(`${getPrompt()} ${cmd}`);

    if (cmd === "") {
        // empty line, nothing to do
        return;
    }

    // split into command + args
    const parts = cmd.split(/\s+/);
    const name = parts[0];
    const args = parts.slice(1);

    switch (name) {
        case "help":
            appendOutput(
                "Available commands:\n" +
                "help           - show this help\n" +
                "about          - about the creator\n" +
                "projects       - list my work\n" +
                "change <user>  - change user in prompt\n" +
                "clear          - clear the terminal\n" +
                "updatedesc          - update description to new provided description\n"
            );
            break;

        case "about":
            appendOutput(
                `${currentUser}: ${getDesc()}`
            );
            break;

        case "projects":
            appendOutput(
                "- crypto-visualizer\n" +
                "- gem dust calculator\n" +
                "- netcat webserver\n" +
                "- html generator\n"
            );
            break;

        case "clear":
            output.textContent = "";
            break;

        case "change":
            if (args.length === 0 || !args[0]) {
                appendOutput('Usage: change <newUserName>');
            } else {
                currentUser = args[0];
                updatePromptSpan();
                appendOutput(`User changed to ${currentUser}`);
            }
            break;
        
        case "updatedesc":
            let newdesc = args.join(" ").trim()
            updateDesc(newdesc)
            appendOutput("Description updated")
            break;

        case "whoami":
            appendOutput(currentUser)
            break;

        case "echo":
            let arg = args.join(" ").trim()
            appendOutput(arg)
            break;

        default:
            appendOutput(`Command not found: ${name}`);
    }
}

function appendOutput(text) {
    output.textContent += text + "\n";
}
