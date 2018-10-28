document.addEventListener('DOMContentLoaded', () => {

    const onceXHRCallback = (callback) => {
        const originalSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.callback = callback;
        XMLHttpRequest.prototype.send = function () {
            XMLHttpRequest.callback(this);
            originalSend.apply(this, arguments);
            XMLHttpRequest.callback = null;
            XMLHttpRequest.prototype.send = originalSend;
        };
    };

    const convertData = (data) => {
        return data.reduce((prevVal, item) => {
            return prevVal += encodeURI(item['mp3']) + '\n';
        }, '');
    };

    const setFile = (data, fileName) => {
        const blob = new Blob([data]);
        if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    const downloadBook = () => {
        const fileName = document.querySelector('.topic-title').textContent.trim() + '.urls';
        const playerScriptText = document.querySelectorAll('.main-frame script')[1].textContent;
        onceXHRCallback((xhr) => {
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.response);
                const data = JSON.parse(response.aItems);
                const listStr = convertData(data);
                setFile(listStr, fileName);
            });
        });
        eval(playerScriptText);
    };

    const setupDownloadButton = () => {
        let btn = document.createElement('div');
        btn.title = 'Загрузить список URL';
        const style = {
            position: 'fixed',
            top: '15px',
            right: '15px',
            zIndex: 1000,
            cursor: 'pointer',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            backgroundColor: '#ffffff',
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBmaWxsPSIjMDAwIiBkPSJNMjU2LDBDMTE0LjYwOSwwLDAsMTE0LjYwOSwwLDI1NmMwLDE0MS4zOTEsMTE0LjYwOSwyNTYsMjU2LDI1NmMxNDEuMzkxLDAsMjU2LTExNC42MDksMjU2LTI1NiBDNTEyLDExNC42MDksMzk3LjM5MSwwLDI1NiwweiBNMjU2LDQ3MmMtMTE5LjI5NywwLTIxNi05Ni43MDMtMjE2LTIxNlMxMzYuNzAzLDQwLDI1Niw0MHMyMTYsOTYuNzAzLDIxNiwyMTZTMzc1LjI5Nyw0NzIsMjU2LDQ3MiB6Ii8+PHBvbHlnb24gcG9pbnRzPSIzNTIsMzIwIDM1MiwzNTIgMjU2LDM1MiAxNjAsMzUyIDE2MCwzMjAgMTI4LDMyMCAxMjgsMzg0IDM4NCwzODQgMzg0LDMyMCIvPjxwb2x5Z29uIHBvaW50cz0iMjcyLDI1NiAyNzIsMTI4IDI0MCwxMjggMjQwLDI1NiAxOTIsMjU2IDI1NiwzMzYgMzIwLDI1NiIvPjwvc3ZnPg==')",
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        };
        for (let option in style) {
            if (style.hasOwnProperty(option)) {
                btn.style[option] = style[option];
            }
        }
        btn.addEventListener('click', downloadBook);
        document.body.appendChild(btn);
    };

    if (document.querySelector('audio')) {
        setupDownloadButton();
    }
});