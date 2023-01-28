exports.wait = () => {
   return ("Mohon tunggu sebentar~")
}


exports.getGroupAdmins = function(participants){
    let admins  = []
	for (let i of participants) {
		i.admin  !== null ? admins.push(i.id) : ''
	}
	return admins
}

exports.groupOnly = function(){
    return "Perintah Ini Hanya Bisa Digunakan di Group!"
}

exports.adminsOnly = function(){
    return "Perintah Ini Hanya Bisa Digunakan Admin Group!"
}

exports.err = (cmd, err) => {
    return `Error ${cmd}: ${err}`
}

exports.noUrl = () => {
    return "Input Harus Berupa Url!"
}