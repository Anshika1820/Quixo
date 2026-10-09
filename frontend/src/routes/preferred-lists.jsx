
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  ExternalLink,
  FolderHeart,
  Plus,
  Trash2,
  X,
} from "lucide-react";
console.log("PREFERRED LISTS ROUTE MODULE LOADED");
import {
  getPreferredLists,
  createPreferredList,
  removeSavedResult,
  deletePreferredList,
} from "@/lib/preferredLists";

export const Route = createFileRoute("/preferred-lists")({
  component: PreferredListsPage,
});


function PreferredListsPage() {
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeListId, setActiveListId] = useState(null);
  const [message, setMessage] = useState("");

  function refreshLists() {
    const updatedLists = getPreferredLists();
    setLists(updatedLists);

    setActiveListId((currentId) => {
      if (currentId && updatedLists.some((list) => list.id === currentId)) {
        return currentId;
      }

      return updatedLists[0]?.id ?? null;
    });
  }

  useEffect(() => {
    refreshLists();
  }, []);

  const activeList = lists.find((list) => list.id === activeListId);

  function handleCreateList(event) {
    event.preventDefault();

    const result = createPreferredList(listName);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setListName("");
    setShowCreateForm(false);
    setMessage("");
    setActiveListId(result.list.id);
    refreshLists();
  }

  function handleRemoveResult(listId, itemId) {
    const success = removeSavedResult(listId, itemId);

    if (!success) {
      setMessage("Could not remove this resource. Please try again.");
      return;
    }

    setMessage("");
    refreshLists();
  }

  function handleDeleteList(listId) {
    const listToDelete = lists.find((list) => list.id === listId);

    if (!listToDelete) return;

    const confirmed = window.confirm(
      `Delete "${listToDelete.name}" and all its saved resources?`
    );

    if (!confirmed) return;

    const success = deletePreferredList(listId);

    if (!success) {
      setMessage("Could not delete this list. Please try again.");
      return;
    }

    setMessage("");
    refreshLists();
  }

  return (
    <main className="min-h-screen bg-[#08070d] px-4 pb-20 pt-28 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#a197b0] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Quixo
          </a>

          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-300">
                <Bookmark size={16} />
                YOUR PERSONAL LIBRARY
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Preferred <span className="text-violet-300">Lists</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#a197b0] sm:text-base">
                Keep useful discoveries organized. Save resources for interview
                prep, research, career opportunities, and more.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowCreateForm((current) => !current);
                setMessage("");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
            >
              {showCreateForm ? <X size={17} /> : <Plus size={17} />}
              {showCreateForm ? "Cancel" : "Create a list"}
            </button>
          </div>

          {showCreateForm && (
            <form
              onSubmit={handleCreateList}
              className="mb-8 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row"
            >
              <input
                autoFocus
                value={listName}
                onChange={(event) => setListName(event.target.value)}
                placeholder="e.g. Java Resources, Google SDE Prep"
                maxLength={60}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-[#716780] focus:border-violet-400"
              />

              <button
                type="submit"
                className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
              >
                Create list
              </button>
            </form>
          )}

          {message && (
            <p role="status" className="mb-5 text-sm text-violet-300">
              {message}
            </p>
          )}

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.025] p-3">
              <div className="flex items-center justify-between px-3 py-3">
                <span className="text-sm font-semibold">Your lists</span>
                <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs text-[#a197b0]">
                  {lists.length}
                </span>
              </div>

              {lists.length === 0 ? (
                <div className="px-3 py-6 text-sm leading-6 text-[#8d829d]">
                  Your library is empty. Create a list to get started.
                </div>
              ) : (
                <div className="space-y-1">
                  {lists.map((list) => (
                    <button
                      key={list.id}
                      type="button"
                      onClick={() => {
                        setActiveListId(list.id);
                        setMessage("");
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                        activeListId === list.id
                          ? "bg-violet-500/15 text-violet-200"
                          : "text-[#a197b0] hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <FolderHeart size={17} className="shrink-0" />
                        <span className="truncate">{list.name}</span>
                      </span>

                      <span className="text-xs text-[#8d829d]">
                        {list.items.length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </aside>

            <section className="min-w-0">
              {!activeList ? (
                <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 text-center">
                  <FolderHeart size={34} className="mb-4 text-violet-300" />

                  <h2 className="text-lg font-semibold">Build your library</h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#8d829d]">
                    Create a list now, then save results from your Quixo
                    searches to keep everything organized.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowCreateForm(true)}
                    className="mt-5 rounded-xl border border-violet-400/30 px-4 py-2.5 text-sm text-violet-200 transition hover:bg-violet-400/10"
                  >
                    Create your first list
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {activeList.name}
                      </h2>
                      <p className="mt-1 text-sm text-[#8d829d]">
                        {activeList.items.length} saved{" "}
                        {activeList.items.length === 1 ? "resource" : "resources"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteList(activeList.id)}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#a197b0] transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <Trash2 size={15} />
                      Delete list
                    </button>
                  </div>

                  {activeList.items.length === 0 ? (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-6 text-center">
                      <Bookmark size={30} className="mb-4 text-violet-300" />

                      <h3 className="font-medium">Nothing saved here yet</h3>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-[#8d829d]">
                        Search in Quixo and use the Save to list action on a
                        result to add it to this collection.
                      </p>

                      <a
                        href="/search"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-violet-400"
                      >
                        Explore search results
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeList.items.map((item) => (
                        <motion.article
                          key={item.id}
                          layout
                          className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-violet-400/25 sm:p-6"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0 flex-1">
                              {item.source && (
                                <p className="mb-2 text-xs text-violet-300">
                                  {item.source}
                                </p>
                              )}

                              <h3 className="text-base font-semibold leading-6 sm:text-lg">
                                {item.title}
                              </h3>

                              {item.snippet && (
                                <p className="mt-2 text-sm leading-6 text-[#a197b0]">
                                  {item.snippet}
                                </p>
                              )}

                              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#8d829d]">
                                {item.mode && <span>{item.mode}</span>}
                                {item.query && (
                                  <span>Saved from: {item.query}</span>
                                )}
                                {item.savedAt && (
                                  <span>
                                    Saved{" "}
                                    {new Date(item.savedAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveResult(activeList.id, item.id)
                              }
                              aria-label={`Remove ${item.title}`}
                              title="Remove resource"
                              className="shrink-0 rounded-lg p-2 text-[#8d829d] transition hover:bg-red-500/10 hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-5 border-t border-white/[0.07] pt-4">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition hover:text-violet-200"
                            >
                              Open original source
                              <ExternalLink size={15} />
                            </a>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

