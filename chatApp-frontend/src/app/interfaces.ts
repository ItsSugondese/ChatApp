export interface userData{
    name : string,
    sessionId : string
}

export interface jwtVariable{
    token : string,
}

export interface senderReceiver{
    sender : string | null,
    receiver : string | null
}

export interface message{
    from : string |null,
	to: string | null,
	content : string | null
}