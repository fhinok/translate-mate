export default {
    showDialog: false,
    title: '',
    message: '',
    buttonOK: 'OK',

    show(title, message, callback = null) {
        this.title = title;
        this.message = message;
        this.showDialog = true;

        return new Promise((resolve, reject) => {
            const handleClose = () => {
                this.showDialog = false;
                if (callback) {
                    callback();
                }
                resolve();
            };

            // Add event listener for dialog confirm
            document.querySelector('#dialog-confirm').addEventListener('click', handleClose);
        });
    }
}