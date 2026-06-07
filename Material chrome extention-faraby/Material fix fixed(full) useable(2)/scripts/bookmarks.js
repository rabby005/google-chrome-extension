/* 
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

// ------------------------ Bookmark System -----------------------------------
// DOM Variables
const bookmarkButton = document.getElementById("bookmarkButton");
const bookmarkSidebar = document.getElementById("bookmarkSidebar");
const bookmarkList = document.getElementById("bookmarkList");
const bookmarkSearch = document.getElementById("bookmarkSearch");
const bookmarkSearchClearButton = document.getElementById("clearSearchButton");
const bookmarkViewGrid = document.getElementById("bookmarkViewGrid");
const bookmarkViewList = document.getElementById("bookmarkViewList");
const bookmarksCheckbox = document.getElementById("bookmarksCheckbox");

const editBookmarkModal = document.getElementById("editBookmarkModal");
const editBookmarkName = document.getElementById("editBookmarkName");
const editBookmarkURL = document.getElementById("editBookmarkURL");
const editBookmarkFavicon = document.getElementById("editBookmarkFavicon");
const saveBookmarkChanges = document.getElementById("saveBookmarkChanges");
const cancelBookmarkEdit = document.getElementById("cancelBookmarkEdit");
let currentBookmarkId = null;

const sortAll = document.getElementById("sortAll");
const sortAlphabetical = document.getElementById("sortAlphabetical");
const sortTimeAdded = document.getElementById("sortTimeAdded");
let currentSortMethod = localStorage.getItem("bookmarkSortMethod") || 'all';

var bookmarksAPI;
if (isFirefox) {
    bookmarksAPI = browser.bookmarks;
} else if (isChromiumBased) {
    bookmarksAPI = chrome.bookmarks;
}

// Initialize sort buttons
updateSortButtons();

bookmarkButton.addEventListener("click", function () {
    toggleBookmarkSidebar();
    bookmarkSearchClearButton.click();
    bookmarkSearch.focus();
});

const closeBookmarkPopup = document.getElementById("closeBookmarkPopup");
if (closeBookmarkPopup) {
    closeBookmarkPopup.addEventListener("click", toggleBookmarkSidebar);
}

// Toggle folder visibility
const toggleFoldersBtn = document.getElementById("toggleFoldersBtn");
const bookmarkListEl = document.getElementById("bookmarkList");
let foldersVisible = localStorage.getItem("bookmarkFoldersVisible") !== "false";

function applyFolderVisibility() {
    if (foldersVisible) {
        bookmarkListEl.classList.remove("folders-hidden");
        if (toggleFoldersBtn) {
            toggleFoldersBtn.classList.remove("folders-hidden");
            toggleFoldersBtn.title = "Hide folders";
        }
    } else {
        bookmarkListEl.classList.add("folders-hidden");
        if (toggleFoldersBtn) {
            toggleFoldersBtn.classList.add("folders-hidden");
            toggleFoldersBtn.title = "Show folders";
        }
    }
}

applyFolderVisibility();

if (toggleFoldersBtn) {
    toggleFoldersBtn.addEventListener("click", () => {
        foldersVisible = !foldersVisible;
        localStorage.setItem("bookmarkFoldersVisible", foldersVisible);
        applyFolderVisibility();
    });
}

bookmarkViewGrid.addEventListener("click", function () {
    if (!bookmarkGridCheckbox.checked) bookmarkGridCheckbox.click();
});

bookmarkViewList.addEventListener("click", function () {
    if (bookmarkGridCheckbox.checked) bookmarkGridCheckbox.click();
});

document.addEventListener("click", function (event) {
    const modalContainer = document.getElementById("prompt-modal-container");
    // If modal is open, don't close the sidebar
    if (modalContainer && modalContainer.style.display === "flex") {
        return;
    }

    if (
        !bookmarkSidebar.contains(event.target) &&
        !bookmarkButton.contains(event.target) &&
        !editBookmarkModal.contains(event.target) &&
        bookmarkSidebar.classList.contains("open")
    ) {
        toggleBookmarkSidebar();

        if (editBookmarkModal.style.display !== "none") {
            editBookmarkModal.style.display = "none";
        }
    }
});

// Search Functionality
bookmarkSearch.addEventListener("input", function () {
    const searchTerm = bookmarkSearch.value.toLowerCase();
    const bookmarks = bookmarkList.querySelectorAll("li[data-url], li.folder"); // Include both bookmarks and folders

    Array.from(bookmarks).forEach(function (bookmark) {
        const text = bookmark.textContent.toLowerCase();
        const url = bookmark.dataset.url ? bookmark.dataset.url.toLowerCase() : "";
        const isFolder = bookmark.classList.contains("folder");

        // Show bookmarks if the search term matches either the name or the URL
        if (!isFolder && (text.includes(searchTerm) || url.includes(searchTerm))) {
            bookmark.style.display = ""; // Show matching bookmarks
        } else if (isFolder) {
            // For folders, check if any child bookmarks match the search
            const childBookmarks = bookmark.querySelectorAll("li[data-url]");
            let hasVisibleChild = false;
            Array.from(childBookmarks).forEach(function (childBookmark) {
                const childText = childBookmark.textContent.toLowerCase();
                const childUrl = childBookmark.dataset.url ? childBookmark.dataset.url.toLowerCase() : "";
                if (childText.includes(searchTerm) || childUrl.includes(searchTerm)) {
                    hasVisibleChild = true;
                    childBookmark.style.display = ""; // Show matching child bookmarks
                } else {
                    childBookmark.style.display = "none"; // Hide non-matching child bookmarks
                }
            });

            if (hasVisibleChild) {
                bookmark.style.display = ""; // Show folder if it has matching child bookmarks
                bookmark.classList.add("open"); // Open folder to show matching child bookmarks
            } else {
                bookmark.style.display = "none"; // Hide folder if no child matches
                bookmark.classList.remove("open");
            }
        } else {
            bookmark.style.display = "none"; // Hide non-matching bookmarks
        }
    });

    if (searchTerm === "") {
        // Reset display for all bookmarks and folders
        Array.from(bookmarks).forEach(function (bookmark) {
            bookmark.style.display = "";
            if (bookmark.classList.contains("folder")) {
                bookmark.classList.remove("open");
                const childList = bookmark.querySelector("ul");
                if (childList) {
                    childList.classList.add("hidden");
                }
            }
        });
    }

    // Show or hide the clear button based on the search term
    bookmarkSearchClearButton.style.display = searchTerm ? "inline" : "none";
});

// Sorting functionality
sortAll.addEventListener("click", function () {
    currentSortMethod = 'all';
    localStorage.setItem("bookmarkSortMethod", "all");
    // "All" = hide folder headers, show only bookmark items
    foldersVisible = false;
    localStorage.setItem("bookmarkFoldersVisible", "false");
    updateSortButtons();
    loadBookmarks();
    applyFolderVisibility();
});

sortAlphabetical.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
        currentSortMethod = 'title';
        localStorage.setItem("bookmarkSortMethod", "title");
        updateSortButtons();
        loadBookmarks();
    }
    // Sorting by A-Z: show folders
    foldersVisible = true;
    localStorage.setItem("bookmarkFoldersVisible", "true");
    applyFolderVisibility();
});

sortTimeAdded.addEventListener("click", function () {
    if (!this.classList.contains("active")) {
        currentSortMethod = 'date';
        localStorage.setItem("bookmarkSortMethod", "date");
        updateSortButtons();
        loadBookmarks();
    }
    // Sorting by Old-New: show folders
    foldersVisible = true;
    localStorage.setItem("bookmarkFoldersVisible", "true");
    applyFolderVisibility();
});

function updateSortButtons() {
    sortAll.classList.toggle("active", currentSortMethod === 'all');
    sortAlphabetical.classList.toggle("active", currentSortMethod === 'title');
    sortTimeAdded.classList.toggle("active", currentSortMethod === 'date');
}


bookmarkSearchClearButton.addEventListener("click", function () {
    bookmarkSearch.value = "";
    bookmarkSearch.dispatchEvent(new Event("input")); // Trigger input event to clear search results
});

function updateBookmarkUI(enabled) {
    bookmarksCheckbox.checked = enabled;
    bookmarkButton.style.display = enabled ? "flex" : "none";
    saveDisplayStatus("bookmarksDisplayStatus", enabled ? "flex" : "none");
    saveCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
}

async function verifyBookmarkPermission() {
    // Early exit for unsupported browsers
    let bookmarksPermission;
    if (isFirefox) bookmarksPermission = browser.permissions;
    else if (isChromiumBased) bookmarksPermission = chrome.permissions;

    if (!bookmarksPermission) {
        await alertPrompt(translations[currentLanguage]?.UnsupportedBrowser ||
            translations['en'].UnsupportedBrowser);
        updateBookmarkUI(false);
        return false;
    }

    // Firefox always has permission
    if (isFirefox) {
        updateBookmarkUI(true);
        return true;
    }

    // Chromium-based browsers
    // Opera doesn't have favicon permission yet
    const requiredPermissions = isOpera ? ["bookmarks"] : ["bookmarks", "favicon"];

    const hasPermission = await new Promise(resolve =>
        chrome.permissions.contains({ permissions: requiredPermissions }, resolve));

    if (!hasPermission) {
        const granted = await new Promise(resolve =>
            chrome.permissions.request({ permissions: requiredPermissions }, resolve));

        if (!granted) {
            updateBookmarkUI(false);
            return false;
        }
        bookmarksAPI = chrome.bookmarks; // Initialize if just granted
    }

    // Success case
    updateBookmarkUI(true);
    return true;
}

async function toggleBookmarkSidebar() {
    const hasPermission = await verifyBookmarkPermission();
    if (hasPermission) {
        bookmarkSidebar.classList.toggle("open");
        bookmarkButton.classList.toggle("rotate");

        if (bookmarkSidebar.classList.contains("open")) {
            loadBookmarks();
        }
    }
}

// Function to load bookmarks
function loadBookmarks() {
    if (!bookmarksAPI?.getTree) {
        console.error("Bookmarks API is unavailable. Please check permissions or context.");
        return;
    }

    bookmarksAPI.getTree().then(bookmarkTreeNodes => {
        // Clear the current list
        bookmarkList.innerHTML = "";

        // If foldersVisible is false (All mode), show flat list of all bookmarks
        if (!foldersVisible) {
            const allBookmarks = [];
            function collectAllBookmarks(nodes) {
                for (const node of nodes) {
                    if (node.url) {
                        allBookmarks.push(node);
                    } else if (node.children && node.title !== "Material You Shortcuts") {
                        collectAllBookmarks(node.children);
                    }
                }
            }
            collectAllBookmarks(bookmarkTreeNodes);

            if (currentSortMethod === 'title') {
                allBookmarks.sort((a, b) => a.title.localeCompare(b.title));
            } else if (currentSortMethod === 'date') {
                allBookmarks.sort((a, b) => (a.dateAdded || 0) - (b.dateAdded || 0));
            }

            bookmarkList.appendChild(displayBookmarks(allBookmarks));
            return;
        }

        // Display the "Recently Added" folder
        if (bookmarksAPI.getRecent) {
            bookmarksAPI.getRecent(8).then(recentBookmarks => {
                if (recentBookmarks.length > 0) {
                    const recentAddedFolder = {
                        title: translations[currentLanguage]?.recentlyAddedBookmarks || translations["en"]?.recentlyAddedBookmarks,
                        children: recentBookmarks
                    };
                    bookmarkList.appendChild(displayBookmarks([recentAddedFolder]));
                }
            });
        }

        // For Firefox: "Bookmarks Menu" and "Other Bookmarks" are distinct nodes
        if (isFirefox) {
            const toolbarNode = bookmarkTreeNodes[0]?.children?.find(node => node.title === "Bookmarks Toolbar");
            const menuNode = bookmarkTreeNodes[0]?.children?.find(node => node.title === "Bookmarks Menu");
            const otherNode = bookmarkTreeNodes[0]?.children?.find(node => node.title === "Other Bookmarks");

            if (toolbarNode?.children) bookmarkList.appendChild(displayBookmarks(toolbarNode.children));
            if (menuNode?.children) bookmarkList.appendChild(displayBookmarks(menuNode.children));
            if (otherNode?.children) bookmarkList.appendChild(displayBookmarks(otherNode.children));
        }
        else {
            let default_folder = "Bookmarks bar";
            if (isEdge) default_folder = "Favorites bar";
            if (isBrave) default_folder = "Bookmarks";

            // Get the children of the root bookmark folder
            const rootChildren = bookmarkTreeNodes[0]?.children || [];

            // Find and process the default bookmarks folder
            const mainBookmarks = rootChildren.find(node =>
                node.title === default_folder ||
                node.folderType === "bookmarks-bar"
            );

            // If the default folder has children, display its bookmarks
            if (mainBookmarks?.children) {
                bookmarkList.appendChild(displayBookmarks(mainBookmarks.children));
            }

            // Process all other root-level folders
            rootChildren.forEach(node => {
                if (node !== mainBookmarks && node.id !== "1" && node.children) {
                    bookmarkList.appendChild(displayBookmarks([node]));
                }
            });
        }
    }).catch(err => {
        console.error("Error loading bookmarks:", err);
    });
}

// Function to set the favicon for a bookmark
function setBookmarkFavicon(faviconElement, pageUrl) {
    // Final fallback to local offline icon
    const offlineFallback = () => faviconElement.src = "./svgs/offline.svg";

    // Google favicon api fallback
    const googleFallback = () => {
        faviconElement.src = `https://www.google.com/s2/favicons?domain=${new URL(pageUrl).hostname}&sz=32`;
        faviconElement.onerror = offlineFallback;
    };

    // Try browser-specific favicon first (Chromium only)
    if (!isFirefox || !isOpera) {
        faviconElement.src = `chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(pageUrl)}&size=32`;
        faviconElement.onerror = googleFallback;
    } else {
        googleFallback();
    }
}

function displayBookmarks(bookmarkNodes) {
    let list = document.createElement("ul");

    // Separate folders and bookmarks
    const folders = bookmarkNodes.filter(node => node.children && node.children.length > 0);
    const bookmarks = bookmarkNodes.filter(node => node.url);

    // Sorting folders and bookmarks separately by title or dateAdded
    if (currentSortMethod === 'title') {
        folders.sort((a, b) => a.title.localeCompare(b.title));
        bookmarks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (currentSortMethod === 'date') {
        folders.sort((a, b) => (a.dateAdded || 0) - (b.dateAdded || 0));
        bookmarks.sort((a, b) => (a.dateAdded || 0) - (b.dateAdded || 0));
    }
    // 'all' = browser natural order, no sorting needed

    // Combine folders and bookmarks
    const sortedNodes = [...bookmarks, ...folders];

    for (let node of sortedNodes) {
        if (node.id === "1") continue;

        if (node.children && node.children.length > 0) {
            // Skip the "Material You Shortcuts" folder — those are Saved Shortcuts only
            if (node.title === "Material You Shortcuts") continue;

            let folderItem = document.createElement("li");

            folderItem.dataset.id = node.id;
            folderItem.classList.add("folder");

            // Create the tab header div
            const tabHeader = document.createElement("div");
            tabHeader.classList.add("folder-tab-header");

            // Folder icon
            const folderIcon = document.getElementById("folderIconTemplate").cloneNode(true);
            folderIcon.removeAttribute("id");
            tabHeader.appendChild(folderIcon);

            // Folder label
            const label = document.createElement("span");
            label.classList.add("folder-tab-label");
            label.textContent = node.title;
            tabHeader.appendChild(label);

            folderItem.appendChild(tabHeader);

            // Click handled by event delegation on bookmarkList

            let subList = displayBookmarks(node.children);
            folderItem.appendChild(subList);

            list.appendChild(folderItem);
        } else if (node.url) {
            let item = document.createElement("li");
            item.dataset.id = node.id; // Add ID as dataset for context menu
            item.dataset.url = node.url; // Add URL as dataset for search functionality
            let link = document.createElement("a");
            link.href = node.url;
            let span = document.createElement("span");
            span.textContent = node.title;

            const favicon = document.createElement("img");
            setBookmarkFavicon(favicon, node.url);
            favicon.classList.add("favicon");

            // Create the delete button
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "✖";
            deleteButton.classList.add("bookmark-delete-button");

            deleteButton.addEventListener("click", async function (event) {
                event.preventDefault();
                event.stopPropagation();

                const confirmMessage = (translations[currentLanguage]?.deleteBookmark || translations["en"].deleteBookmark)
                    .replace("{title}", node.title || node.url);

                if (await confirmPrompt(confirmMessage)) {
                    if (isFirefox) {
                        // Firefox API (Promise-based)
                        bookmarksAPI.remove(node.id).then(() => {
                            item.remove(); // Remove the item from the DOM
                        }).catch(err => {
                            console.error("Error removing bookmark:", err);
                        });
                    } else {
                        // Chrome API (Callback-based)
                        bookmarksAPI.remove(node.id, function () {
                            item.remove(); // Remove the item from the DOM
                        });
                    }
                }
            });

            link.appendChild(favicon);
            link.appendChild(span);
            item.appendChild(link);

            // Create More Actions Button (Three Dots)
            const moreBtn = document.createElement("button");
            moreBtn.classList.add("bookmark-more-btn");
            const moreIcon = document.getElementById("moreIconTemplate").cloneNode(true);
            moreIcon.removeAttribute("id");
            moreBtn.appendChild(moreIcon);

            // Create Actions Menu
            const actionsMenu = document.createElement("div");
            actionsMenu.classList.add("bookmark-actions-menu");

            const editAction = document.createElement("div");
            editAction.classList.add("bookmark-action-item");
            editAction.textContent = translations[currentLanguage]?.edit || "Edit";
            editAction.onclick = (e) => {
                e.stopPropagation();
                actionsMenu.classList.remove("show");
                openEditModal(node.id, node.title, node.url);
            };

            const deleteAction = document.createElement("div");
            deleteAction.classList.add("bookmark-action-item", "delete");
            deleteAction.textContent = translations[currentLanguage]?.delete || "Delete";
            deleteAction.onclick = async (e) => {
                e.stopPropagation();
                actionsMenu.classList.remove("show");
                const confirmMessage = (translations[currentLanguage]?.deleteBookmark || translations["en"].deleteBookmark)
                    .replace("{title}", node.title || node.url);

                if (await confirmPrompt(confirmMessage)) {
                    if (isFirefox) {
                        bookmarksAPI.remove(node.id).then(() => {
                            item.remove();
                        }).catch(err => console.error("Error removing bookmark:", err));
                    } else {
                        bookmarksAPI.remove(node.id, () => item.remove());
                    }
                }
            };

            actionsMenu.appendChild(editAction);
            actionsMenu.appendChild(deleteAction);
            item.appendChild(moreBtn);
            item.appendChild(actionsMenu);

            moreBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Close other open menus
                document.querySelectorAll(".bookmark-actions-menu.show").forEach(menu => {
                    if (menu !== actionsMenu) menu.classList.remove("show");
                });
                actionsMenu.classList.toggle("show");
            };

            // Click = open directly in current tab; Ctrl/Meta = new tab
            link.addEventListener("click", function (event) {
                event.preventDefault();
                if (event.ctrlKey || event.metaKey || event.shiftKey) {
                    if (isFirefox) {
                        browser.tabs.create({ url: node.url, active: false });
                    } else if (isChromiumBased) {
                        chrome.tabs.create({ url: node.url, active: false });
                    } else {
                        window.open(node.url, "_blank");
                    }
                } else {
                    if (isFirefox) {
                        browser.tabs.update({ url: node.url });
                    } else if (isChromiumBased) {
                        chrome.tabs.update({ url: node.url });
                    } else {
                        window.location.href = node.url;
                    }
                }
            });
            list.appendChild(item);
        }
    }

    // Don't stopPropagation here — folder toggle delegation needs to bubble up

    return list;
}

// Function to open the edit modal
function openEditModal(id, title, url) {
    currentBookmarkId = id;
    document.getElementById("editBookmarkHeading").textContent = translations[currentLanguage]?.editBookmarkHeading || "Edit Bookmark";
    editBookmarkName.value = title;
    editBookmarkURL.value = url;
    if (url) setBookmarkFavicon(editBookmarkFavicon, url);
    else editBookmarkFavicon.src = "./svgs/offline.svg";

    // Hide folder selector when editing (only show for new bookmarks)
    bookmarkFolderSelectorWrap.style.display = "none";

    // Show modal
    editBookmarkModal.style.display = "block";
    saveBookmarkChanges.disabled = false;
}

// Right-click (context menu) event
bookmarkList.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Prevent default right-click menu

    const bookmarkItem = event.target.closest("li[data-id]");
    if (!bookmarkItem) return;

    const id = bookmarkItem.dataset.id;
    const title = (bookmarkItem.querySelector("a") || bookmarkItem).textContent.trim();
    const url = bookmarkItem.dataset.url || "";

    openEditModal(id, title, url);
});

// Hide action menus when clicking anywhere else
document.addEventListener("click", () => {
    document.querySelectorAll(".bookmark-actions-menu.show").forEach(menu => {
        menu.classList.remove("show");
    });
});

// ---- Folder Selector for Add Bookmark ----
let selectedFolderId = null;

const folderSelectorBtn = document.getElementById("folderSelectorBtn");
const folderDropdown = document.getElementById("folderDropdown");
const folderSelectorText = document.getElementById("folderSelectorText");
const bookmarkFolderSelectorWrap = document.getElementById("bookmarkFolderSelectorWrap");

async function buildFolderTree() {
    folderDropdown.innerHTML = "";
    try {
        const tree = await bookmarksAPI.getTree();
        function renderFolders(nodes, depth) {
            for (const node of nodes) {
                if (!node.children) continue;
                const item = document.createElement("div");
                item.className = "folder-option";
                item.style.paddingLeft = (12 + depth * 16) + "px";
                item.dataset.id = node.id;
                item.dataset.title = node.title || "Bookmarks";
                item.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg><span>${node.title || "Bookmarks"}</span>`;
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    selectedFolderId = node.id;
                    folderSelectorText.textContent = node.title || "Bookmarks";
                    folderDropdown.style.display = "none";
                    document.querySelectorAll(".folder-option.selected").forEach(el => el.classList.remove("selected"));
                    item.classList.add("selected");
                });
                if (selectedFolderId === node.id) item.classList.add("selected");
                folderDropdown.appendChild(item);
                if (node.children) renderFolders(node.children, depth + 1);
            }
        }
        renderFolders(tree, 0);
    } catch (e) {
        console.error("Folder tree error:", e);
    }
}

folderSelectorBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = folderDropdown.style.display === "block";
    folderDropdown.style.display = isOpen ? "none" : "block";
    if (!isOpen) buildFolderTree();
});

document.addEventListener("click", () => {
    if (folderDropdown) folderDropdown.style.display = "none";
});

folderDropdown.addEventListener("click", e => e.stopPropagation());

const addBookmarkButton = document.getElementById("addBookmarkButton");
addBookmarkButton.addEventListener("click", function () {
    currentBookmarkId = null; // Reset for new bookmark
    document.getElementById("editBookmarkHeading").textContent = translations[currentLanguage]?.addBookmark || "Add Bookmark";
    editBookmarkName.value = "";
    editBookmarkURL.value = "";
    editBookmarkFavicon.src = "./svgs/offline.svg";
    bookmarkFolderSelectorWrap.style.display = "block";
    selectedFolderId = null;
    folderSelectorText.textContent = "Bookmarks bar";
    editBookmarkModal.style.display = "block";
    saveBookmarkChanges.disabled = true;
});

// Disable save button if URL is empty
editBookmarkURL.addEventListener("input", () => {
    saveBookmarkChanges.disabled = editBookmarkURL.value.trim() === "";
    if (editBookmarkURL.value.trim() !== "") {
        setBookmarkFavicon(editBookmarkFavicon, editBookmarkURL.value.trim());
    }
});

// Save button action
saveBookmarkChanges.onclick = function () {
    const updatedTitle = editBookmarkName.value.trim();
    const updatedURL = editBookmarkURL.value.trim();

    if (currentBookmarkId) {
        // Updating existing bookmark
        const updatedData = { title: updatedTitle, url: updatedURL };

        if (isFirefox) {
            bookmarksAPI.update(currentBookmarkId, updatedData).then(() => {
                updateBookmark(currentBookmarkId, updatedTitle, updatedURL);
                editBookmarkModal.style.display = "none";
                loadBookmarks();
            }).catch(err => {
                console.error("Error updating bookmark:", err);
            });
        } else {
            bookmarksAPI.update(currentBookmarkId, updatedData, function () {
                if (chrome.runtime.lastError) {
                    console.error("Error updating bookmark:", chrome.runtime.lastError);
                    return;
                }
                updateBookmark(currentBookmarkId, updatedTitle, updatedURL);
                editBookmarkModal.style.display = "none";
                loadBookmarks();
            });
        }
    } else {
        // Creating new bookmark
        const newData = { title: updatedTitle, url: updatedURL };
        if (selectedFolderId) newData.parentId = selectedFolderId;
        if (isFirefox) {
            bookmarksAPI.create(newData).then(() => {
                editBookmarkModal.style.display = "none";
                loadBookmarks();
            }).catch(err => {
                console.error("Error creating bookmark:", err);
            });
        } else {
            bookmarksAPI.create(newData, function () {
                if (chrome.runtime.lastError) {
                    console.error("Error creating bookmark:", chrome.runtime.lastError);
                    return;
                }
                editBookmarkModal.style.display = "none";
                loadBookmarks();
            });
        }
    }
};

// Cancel button action
cancelBookmarkEdit.onclick = function () {
    editBookmarkModal.style.display = "none";
};

// Function to update after edit
function updateBookmark(bookmarkId, title, url) {
    const bookmarkItem = document.querySelector(`li[data-id="${bookmarkId}"]`);
    if (bookmarkItem) {
        const link = bookmarkItem.querySelector("a");
        link.textContent = title;
        link.href = url;
        bookmarkItem.dataset.url = url;
    }
}

// Bookmark popup helpers
const bookmarkPopupModal = document.getElementById("bookmarkPopupModal");
const bookmarkPopupTitle = document.getElementById("bookmarkPopupTitle");
const bookmarkPopupFavicon = document.getElementById("bookmarkPopupFavicon");
const bookmarkPopupURL = document.getElementById("bookmarkPopupURL");
const bookmarkPopupOpen = document.getElementById("bookmarkPopupOpen");
const bookmarkPopupOpenNew = document.getElementById("bookmarkPopupOpenNew");
const bookmarkPopupCancel = document.getElementById("bookmarkPopupCancel");
let bookmarkPopupCurrentUrl = "";

function showBookmarkPopup(title, url, faviconSrc) {
    bookmarkPopupCurrentUrl = url;
    bookmarkPopupTitle.textContent = title || url;
    bookmarkPopupURL.textContent = url;
    if (faviconSrc) bookmarkPopupFavicon.src = faviconSrc;
    else setBookmarkFavicon(bookmarkPopupFavicon, url);

    bookmarkPopupModal.style.display = "block";
}

function hideBookmarkPopup() {
    bookmarkPopupModal.style.display = "none";
}

bookmarkPopupOpen.addEventListener("click", function () {
    const url = bookmarkPopupCurrentUrl;
    hideBookmarkPopup();
    if (!url) return;
    if (isFirefox) {
        browser.tabs.update({ url });
    } else if (isChromiumBased) {
        chrome.tabs.update({ url });
    } else {
        window.location.href = url;
    }
});

bookmarkPopupOpenNew.addEventListener("click", function () {
    const url = bookmarkPopupCurrentUrl;
    hideBookmarkPopup();
    if (!url) return;
    if (isFirefox) {
        browser.tabs.create({ url, active: false });
    } else if (isChromiumBased) {
        chrome.tabs.create({ url, active: false });
    } else {
        window.open(url, "_blank");
    }
});

bookmarkPopupCancel.addEventListener("click", hideBookmarkPopup);


// Move focus to URL field when Enter is pressed in Name field
editBookmarkName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        editBookmarkURL.focus();
    }
});

// Trigger Save button when Enter is pressed in URL field
editBookmarkURL.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        if (!saveBookmarkChanges.disabled) {
            saveBookmarkChanges.click();
        }
    }
});

// ------------------------ End of Bookmark System -----------------------------------

// Save and load the state of the bookmarks toggle
document.addEventListener("DOMContentLoaded", function () {
    bookmarksCheckbox.addEventListener("change", async function () {
        if (!bookmarksCheckbox.checked) {
            updateBookmarkUI(false);
            return;
        }
        await verifyBookmarkPermission();
    });

    bookmarkGridCheckbox.addEventListener("change", function () {
        saveCheckboxState("bookmarkGridCheckboxState", bookmarkGridCheckbox);
        if (bookmarkGridCheckbox.checked) {
            bookmarkList.classList.add("grid-view");
        } else {
            bookmarkList.classList.remove("grid-view");
        }
    });

    loadCheckboxState("bookmarksCheckboxState", bookmarksCheckbox);
    loadDisplayStatus("bookmarksDisplayStatus", bookmarkButton);
    loadCheckboxState("bookmarkGridCheckboxState", bookmarkGridCheckbox);
});

// Keyboard shortcut for bookmarks
document.addEventListener("keydown", function (event) {
    // Prevent shortcut if modal or menu is open
    const modalContainer = document.getElementById("prompt-modal-container");
    if (modalContainer?.style.display === "flex" || menuBar.style.display !== "none") {
        return;
    }

    if (bookmarksCheckbox.checked &&
        event.key === "ArrowRight" &&
        !event.repeat &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA" &&
        event.target.isContentEditable !== true
    ) {
        bookmarkButton.click();
    }
});

// ---- Folder toggle via capture-phase mousedown (fires before any child handler) ----
bookmarkList.addEventListener("mousedown", function(event) {
    const header = event.target.closest(".folder-tab-header");
    if (!header) return;
    // Only toggle on left click (button 0)
    if (event.button !== 0) return;
    event.stopPropagation();
    const folderLi = header.closest("li.folder");
    if (folderLi) {
        folderLi.classList.toggle("open");
    }
}, true); // true = capture phase, fires before bubble handlers
