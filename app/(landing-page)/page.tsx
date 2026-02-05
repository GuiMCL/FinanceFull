import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getOptionalUserSession } from "@/lib/auth/server";
import {
  RiArrowRightSLine,
  RiBankCardLine,
  RiBarChartBoxLine,
  RiCalendarLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiDeviceLine,
  RiGithubFill,
  RiLineChartLine,
  RiLockLine,
  RiMoneyDollarCircleLine,
  RiPieChartLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiWalletLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await getOptionalUserSession();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#funcionalidades"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Funcionalidades
            </a>
          </nav>

          <nav className="flex items-center gap-2 md:gap-4">
            <AnimatedThemeToggler />
            {session?.user ? (
              <Link prefetch href="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="gap-2">
                    Começar
                    <RiArrowRightSLine size={16} />
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

  

      {/* What's Here Section */}
      <section id="funcionalidades" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                O que tem aqui
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Funcionalidades que importam
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ferramentas simples para organizar suas contas, cartões, gastos
                e receitas
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiWalletLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Contas e transações
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Registre suas contas bancárias, cartões e dinheiro.
                        Adicione receitas, despesas e transferências. Organize
                        por categorias.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiBarChartBoxLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Relatórios e gráficos
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Dashboard com resumo mensal. Gráficos de evolução do
                        patrimônio. Entenda pra onde seu dinheiro está indo.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiBankCardLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Faturas de cartão
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Cadastre seus cartões e acompanhe as faturas. Veja o que
                        ainda não foi fechado. Controle limites e vencimentos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiPieChartLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Categorias personalizadas
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Crie e organize suas próprias categorias. Moradia,
                        alimentação, transporte, ou o que fizer sentido pra
                        você.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiMoneyDollarCircleLine
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Orçamentos</h3>
                      <p className="text-sm text-muted-foreground">
                        Defina quanto quer gastar por categoria no mês.
                        Acompanhe se está dentro do planejado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiCalendarLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Calendário financeiro
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Visualize suas transações em calendário mensal. Nunca
                        perca prazos importantes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Para quem funciona?
              </h2>
              <p className="text-lg text-muted-foreground">
                O opensheets funciona melhor se você:
              </p>
            </div>

            <div className="space-y-4">
              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RiTimeLine size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Tem disciplina de registrar gastos
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Não se importa em dedicar alguns minutos por dia ou
                        semana para manter tudo atualizado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RiLockLine size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Quer controle total sobre seus dados
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Prefere hospedar seus próprios dados ao invés de
                        depender de serviços terceiros
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RiLineChartLine size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Gosta de entender exatamente onde o dinheiro vai
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Quer visualizar padrões de gastos e tomar decisões
                        informadas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-lg border bg-background p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Se você não se encaixa nisso, provavelmente vai abandonar depois
                de uma semana. E tudo bem! Existem outras ferramentas com
                sincronização automática que podem funcionar melhor pra você.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
