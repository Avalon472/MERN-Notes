export function pullAllNotes(req, res){
    res.status(200).send("you got some notes")
}

export function createNote(req, res){
    res.status(201).json({message: "Note created successfully"})
}

export function updateNote(req, res){
    res.status(200).json({message: "Note edited successfully"})
}

export function deleteNote(req, res){
    res.status(200).json({message: "Note deleted successfully"})
}