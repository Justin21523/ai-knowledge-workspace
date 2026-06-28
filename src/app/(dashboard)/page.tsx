import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileSearch,
  FolderKanban,
  MessageSquareText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chatMessages, demoStates, documents, workspace } from "@/data/mock-workspace";

const readyDocuments = documents.filter((document) => document.status === "ready");
const processingDocuments = documents.filter((document) => document.status === "processing");
const assistantMessage = chatMessages.find((message) => message.role === "assistant");
const metricCards: Array<[string, number, LucideIcon]> = [
  ["Documents", documents.length, FileSearch],
  ["Ready sources", readyDocuments.length, CheckCircle2],
  ["Processing", processingDocuments.length, Clock3],
  ["Citations", assistantMessage?.citations.length ?? 0, MessageSquareText],
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border bg-background p-6 shadow-sm">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Source-grounded research workspace
          </div>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            Turn scattered documents into cited, reviewable research answers.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            {workspace.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>
              Review evidence
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="outline">Open demo brief</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Workspace health</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {metricCards.map(([label, value, Icon]) => (
              <div key={label} className="flex items-center justify-between rounded-xl border p-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-muted p-2">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
                <strong className="text-2xl">{value}</strong>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5" aria-hidden="true" />
              Document pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((document) => (
              <article key={document.id} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium">{document.title}</h3>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize text-muted-foreground">
                    {document.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{document.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <span key={tag} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5" aria-hidden="true" />
              Cited answer preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm font-medium">Question</p>
              <p className="mt-1 text-sm text-muted-foreground">{chatMessages[0].content}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-sm font-medium">Assistant answer</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{assistantMessage?.content}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Citations</p>
              {assistantMessage?.citations.map((citation) => (
                <div key={citation.id} className="rounded-lg border-l-4 border-primary bg-muted/60 p-3">
                  <p className="text-sm font-medium">{citation.documentTitle}</p>
                  <q className="mt-1 block text-sm text-muted-foreground">{citation.text}</q>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Demo state coverage</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {demoStates.map((state) => (
            <Card key={state.label}>
              <CardContent className="pt-0">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${state.tone}`}>
                  {state.label}
                </span>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{state.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
