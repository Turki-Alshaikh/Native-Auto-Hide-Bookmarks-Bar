chrome.runtime.sendMessage({ action: "getBookmarksData" }, (response) => {
    if (response && response.bookmarks && response.bookmarks.length > 0) {
        createNativeBookmarksBar(response.bookmarks, response.uiLanguage);
    }
});

function createNativeBookmarksBar(bookmarksTree, uiLanguage) {
    const bookmarksBarNode = bookmarksTree[0].children[0];
    if (!bookmarksBarNode || !bookmarksBarNode.children) return;

    // تحديد الاتجاه بناءً على لغة كروم
    const isRtl = uiLanguage.startsWith('ar') || uiLanguage.startsWith('he');
    
    const bar = document.createElement('div');
    bar.id = 'chrome-native-autohide-bar';
    bar.dir = isRtl ? 'rtl' : 'ltr'; // تطبيق الاتجاه

    const triggerArea = document.createElement('div');
    triggerArea.id = 'chrome-autohide-trigger';
    bar.appendChild(triggerArea);

    const container = document.createElement('div');
    container.id = 'chrome-bookmarks-container';

    // أيقونة مجلد كروم الأصلية (Vector SVG مطابقة تماماً 100%)
    const folderIconSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%239aa0a6' d='M2 2.5C1.17 2.5.5 3.17.5 4v8c0 .83.67 1.5 1.5 1.5h12c.83 0 1.5-.67 1.5-1.5V5.5c0-.83-.67-1.5-1.5-1.5h-5.5L7 2.5H2zM2 4h4.5l1.5 1.5h6V12H2V4z'/%3E%3C/svg%3E";

    // دالة عودية (Recursive) لبناء الإشارات والمجلدات
    function createNode(bookmark) {
        if (bookmark.children) { // إذا كان العنصر مجلداً
            const folderWrapper = document.createElement('div');
            folderWrapper.className = 'chrome-folder-wrapper';

            const btn = document.createElement('div');
            btn.className = 'chrome-bookmark-item chrome-folder-btn';
            
            const icon = document.createElement('img');
            icon.className = 'chrome-bookmark-icon';
            icon.src = folderIconSvg;

            const text = document.createElement('span');
            text.className = 'chrome-bookmark-text';
            text.textContent = bookmark.title;

            btn.appendChild(icon);
            btn.appendChild(text);

            const dropdown = document.createElement('div');
            dropdown.className = 'chrome-dropdown';

            // إضافة العناصر داخل المجلد
            bookmark.children.forEach(child => {
                dropdown.appendChild(createNode(child));
            });

            folderWrapper.appendChild(btn);
            folderWrapper.appendChild(dropdown);

            // برمجة سلوك فتح المجلدات مطابق لكروم الأساسي
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isRoot = folderWrapper.parentElement.id === 'chrome-bookmarks-container';
                if (isRoot) {
                    document.querySelectorAll('#chrome-bookmarks-container > .chrome-folder-wrapper > .chrome-dropdown.show').forEach(el => {
                        if (el !== dropdown) el.classList.remove('show');
                    });
                }
                dropdown.classList.toggle('show');
            });

            btn.addEventListener('mouseenter', () => {
                const isRoot = folderWrapper.parentElement.id === 'chrome-bookmarks-container';
                if (isRoot) {
                    const anyRootOpen = document.querySelector('#chrome-bookmarks-container > .chrome-folder-wrapper > .chrome-dropdown.show');
                    if (anyRootOpen && anyRootOpen !== dropdown) {
                        anyRootOpen.classList.remove('show');
                        dropdown.classList.add('show');
                    }
                } else {
                    dropdown.classList.add('show'); // المجلدات المتفرعة تفتح باللمس
                }
            });

            folderWrapper.addEventListener('mouseleave', () => {
                const isRoot = folderWrapper.parentElement.id === 'chrome-bookmarks-container';
                if (!isRoot) dropdown.classList.remove('show');
            });

            return folderWrapper;
        } else { // إذا كان العنصر رابطاً (موقع)
            const item = document.createElement('a');
            item.className = 'chrome-bookmark-item chrome-link-item';
            item.href = bookmark.url;
            item.title = bookmark.title;

            const icon = document.createElement('img');
            icon.className = 'chrome-bookmark-icon';
            icon.src = `https://www.google.com/s2/favicons?sz=16&domain_url=${encodeURIComponent(bookmark.url)}`;

            const text = document.createElement('span');
            text.className = 'chrome-bookmark-text';
            text.textContent = bookmark.title;

            item.appendChild(icon);
            item.appendChild(text);
            return item;
        }
    }

    bookmarksBarNode.children.forEach(bm => {
        container.appendChild(createNode(bm));
    });

    bar.appendChild(container);
    document.body.appendChild(bar);

    // إغلاق المجلدات عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#chrome-native-autohide-bar')) {
            document.querySelectorAll('.chrome-dropdown.show').forEach(el => el.classList.remove('show'));
        }
    });
}