import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export default function BillingPage() {
    return (
        <main className="flex-1">
            <div className="max-w-3sm mx-auto space-y-8">
                <header className="border-b pb-4 mb-4">
                    <h1 className="font-bold">Billing & Usage</h1>
                    <p className="text-muted-foreground">Manage your subscription and monitor usage</p>
                </header>
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-sm font-semibold">Current Plan</h2>
                            <p className="text-muted-foreground">Free Plan</p>
                        </div>
                        <Button className="bg-primary text-primary-foreground">Upgrade</Button>
                    </div>
                    <div>
                        <p>20 documents/month included</p>
                    </div>
                    <div>
                        <Progress value={(15 / 20) * 100} className="w-full" />
                        <p className="text-sm text-muted-foreground">15/20 documents processed this month</p>
                    </div>
                </section>
                <section>
                    <h2 className="text-sm font-semibold">Plan Comparison</h2>
                    <Table className="w-full mt-4">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>Free Plan</TableHead>
                                <TableHead>Pay As You Go</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Document Limit</TableCell>
                                <TableCell>20 documents/month</TableCell>
                                <TableCell>Unlimited</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Price</TableCell>
                                <TableCell>Free</TableCell>
                                <TableCell>$0.01 per document</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Support Level</TableCell>
                                <TableCell>Email support</TableCell>
                                <TableCell>Priority support</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </section>
                <section className="space-y-4">
                    <h2 className="text-sm font-semibold">Usage History</h2>
                    <LinechartChart className="w-full aspect-[4/3]" />
                </section>
            </div>
        </main>
    )
}

function LinechartChart(props) {
    return (
        <div {...props}>
            <ChartContainer
                config={{
                    desktop: {
                        label: "Desktop",
                        color: "hsl(var(--chart-1))",
                    },
                }}
            >
                <LineChart
                    accessibilityLayer
                    data={[
                        { month: "January", desktop: 186 },
                        { month: "February", desktop: 305 },
                        { month: "March", desktop: 237 },
                        { month: "April", desktop: 73 },
                        { month: "May", desktop: 209 },
                        { month: "June", desktop: 214 },
                    ]}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
        </div>
    )
}