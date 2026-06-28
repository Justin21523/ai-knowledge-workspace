import type { ChatMessage, Document, Workspace } from "@/types/domain";

export const workspace: Workspace = {
  id: "6ce68dfb-786c-44cf-8bbb-2858ef91f16d",
  name: "Research Operations Demo",
  description:
    "A demo workspace for comparing source-heavy notes, policy PDFs, and interview transcripts before writing a research brief.",
  documentIds: [
    "07d9f4ff-6b2c-4d42-ae97-2442d0203f25",
    "50d8d6e9-f138-4573-97e4-7b91d81a5846",
    "f6ce19bf-4bbd-4f4a-b777-f49ff9dbf9e8",
  ],
  createdAt: "2026-06-20T09:00:00.000Z",
};

export const documents: Document[] = [
  {
    id: "07d9f4ff-6b2c-4d42-ae97-2442d0203f25",
    title: "Community Library Service Notes",
    content:
      "Field notes from branch visits covering queue friction, quiet study demand, and repeat questions at the service desk.",
    summary:
      "Patrons need clearer wayfinding, better seat availability signals, and faster answers for recurring policy questions.",
    status: "ready",
    tags: ["library", "field-notes", "service-design"],
    createdAt: "2026-06-20T09:20:00.000Z",
    updatedAt: "2026-06-24T14:30:00.000Z",
  },
  {
    id: "50d8d6e9-f138-4573-97e4-7b91d81a5846",
    title: "AI Search Evaluation Matrix",
    content:
      "Benchmark spreadsheet covering retrieval quality, citation coverage, failure categories, and response latency.",
    summary:
      "Citation coverage improved after chunk filtering, but long-tail policy questions still need better source ranking.",
    status: "processing",
    tags: ["retrieval", "evaluation", "rag"],
    createdAt: "2026-06-22T10:10:00.000Z",
    updatedAt: "2026-06-26T08:45:00.000Z",
  },
  {
    id: "f6ce19bf-4bbd-4f4a-b777-f49ff9dbf9e8",
    title: "Stakeholder Interview Transcript",
    content:
      "Interview transcript with a research coordinator about handoff gaps between collection, annotation, and report writing.",
    summary:
      "The team wants shared evidence trails, source snippets, and a review queue before final reports are published.",
    status: "ready",
    tags: ["interviews", "workflow", "knowledge-management"],
    createdAt: "2026-06-23T16:00:00.000Z",
    updatedAt: "2026-06-27T11:15:00.000Z",
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "b611e4dd-662e-4f99-bb36-b064b9ff4b35",
    role: "user",
    content: "What should the next research brief emphasize?",
    citations: [],
    createdAt: "2026-06-27T13:12:00.000Z",
  },
  {
    id: "07cc71f5-618c-4d09-820f-e5578d6b35e6",
    role: "assistant",
    content:
      "Lead with service desk bottlenecks, then connect them to retrieval evaluation gaps. The strongest evidence trail is the overlap between repeated patron questions and low citation confidence on policy queries.",
    citations: [
      {
        id: "ac271075-df14-49d2-abf3-dbd51cb7965e",
        documentId: "07d9f4ff-6b2c-4d42-ae97-2442d0203f25",
        documentTitle: "Community Library Service Notes",
        text: "repeat questions at the service desk",
        chunkIndex: 4,
      },
      {
        id: "71fdc85f-8fbd-46cb-b6bc-a99ce115a4a2",
        documentId: "50d8d6e9-f138-4573-97e4-7b91d81a5846",
        documentTitle: "AI Search Evaluation Matrix",
        text: "long-tail policy questions still need better source ranking",
        chunkIndex: 9,
      },
    ],
    createdAt: "2026-06-27T13:12:18.000Z",
  },
];

export const demoStates = [
  {
    label: "Loading",
    detail: "Source cards keep their dimensions while summaries are generated.",
    tone: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  },
  {
    label: "Empty",
    detail: "A new workspace invites users to import documents before asking questions.",
    tone: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  },
  {
    label: "Error",
    detail: "Parsing failures are isolated per document and do not block the rest of the workspace.",
    tone: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-200",
  },
  {
    label: "Success",
    detail: "Ready documents show summaries, tags, and source-backed answer coverage.",
    tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200",
  },
];
