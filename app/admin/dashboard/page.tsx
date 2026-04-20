"use client";

import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  List,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Trash2,
  Users,
  X,
  XCircle,
} from "lucide-react";
import {
  ensureAmplifyConfigured,
  getAmplifyErrorMessage,
  getDataClient,
} from "@/lib/amplify";

const ITEMS_PER_PAGE = 10;
const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const formatTimeLabel = (time?: string | null) => {
  if (!time) {
    return "-";
  }

  return /^\d{2}:\d{2}/.test(time) ? time.slice(0, 5) : time;
};

const getApiErrorMessage = (value: unknown) => {
  if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Record<string, unknown>).error === "string"
  ) {
    return (value as Record<string, string>).error;
  }

  return null;
};

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("table");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedReservation, setSelectedReservation] = useState<any | null>(
    null,
  );
  const [selectedDateReservations, setSelectedDateReservations] = useState<{
    date: string;
    reservations: any[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    const initializeDashboard = async () => {
      try {
        await ensureAmplifyConfigured();
        const authenticated = await checkAuth();

        if (!authenticated || cancelled) {
          return;
        }

        await fetchReservations();
      } catch (dashboardError) {
        if (!cancelled) {
          setError(getAmplifyErrorMessage(dashboardError));
          setLoading(false);
        }
      }
    };

    void initializeDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const checkAuth = async () => {
    try {
      await getCurrentUser();
      return true;
    } catch (authError) {
      console.error("Auth error:", authError);
      setError("Authentifizierung fehlgeschlagen. Bitte neu anmelden.");
      window.location.href = "/admin";
      return false;
    }
  };

  const fetchReservations = async () => {
    try {
      const client = await getDataClient();
      const { data: items, errors } = await client.models.Reservation.list();

      if (errors?.length) {
        throw new Error(errors[0]?.message || "Reservierungen konnten nicht geladen werden.");
      }

      const sortedItems = [...(items || [])].sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );

      setReservations(sortedItems);
      setCurrentPage(1);
      setError("");
    } catch (fetchError) {
      console.error("Error fetching reservations:", fetchError);
      setReservations([]);
      setError(getAmplifyErrorMessage(fetchError));
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (
    id: string,
    status: "confirmed" | "cancelled",
  ) => {
    try {
      const client = await getDataClient();
      const reservation = reservations.find((item) => item.id === id);
      let emailError = "";

      await client.models.Reservation.update({ id, status });

      if (reservation) {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "reservation_confirmation",
            payload: {
              reservationId: reservation.id,
              name: reservation.name,
              email: reservation.email,
              date: reservation.date,
              time: reservation.time,
              guests: reservation.guests,
              specialRequests: reservation.specialRequests,
              status,
            },
          }),
        });
        const emailResult = await emailResponse.json().catch(() => null);

        if (!emailResponse.ok || !emailResult?.success) {
          emailError =
            getApiErrorMessage(emailResult) ||
            "Status wurde gespeichert, aber die E-Mail konnte nicht versendet werden.";
          console.error("Reservation status email API error:", emailResult);
        }
      }

      await fetchReservations();

      if (emailError) {
        setError(emailError);
      }
    } catch (updateError) {
      console.error("Error updating reservation:", updateError);
      setError(getAmplifyErrorMessage(updateError));
    }
  };

  const deleteReservation = async (id: string) => {
    if (
      !confirm("Sind Sie sicher, dass Sie diese Reservierung löschen möchten?")
    ) {
      return;
    }

    try {
      const client = await getDataClient();
      await client.models.Reservation.delete({ id });
      await fetchReservations();
    } catch (deleteError) {
      console.error("Error deleting reservation:", deleteError);
      setError(getAmplifyErrorMessage(deleteError));
    }
  };

  const handleSignOut = async () => {
    try {
      await ensureAmplifyConfigured();
      await signOut();
      window.location.href = "/admin";
    } catch (signOutError) {
      console.error("Error signing out:", signOutError);
      setError(getAmplifyErrorMessage(signOutError));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Bestätigt
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Storniert
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Ausstehend
          </Badge>
        );
    }
  };

  const totalPages = Math.max(1, Math.ceil(reservations.length / ITEMS_PER_PAGE));
  const paginatedReservations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return reservations.slice(start, start + ITEMS_PER_PAGE);
  }, [reservations, currentPage]);

  const calendarMonth = selectedDate.getMonth();
  const calendarYear = selectedDate.getFullYear();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const reservationsByDate = useMemo(() => {
    const map: Record<string, any[]> = {};

    reservations.forEach((reservation) => {
      if (!reservation.date) {
        return;
      }

      if (!map[reservation.date]) {
        map[reservation.date] = [];
      }

      map[reservation.date].push(reservation);
    });

    return map;
  }, [reservations]);

  const formatDateKey = (day: number) => {
    const date = new Date(calendarYear, calendarMonth, day);
    return date.toISOString().split("T")[0];
  };

  const prevMonth = () => {
    setSelectedDate(new Date(calendarYear, calendarMonth - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(calendarYear, calendarMonth + 1, 1));
  };

  const handleReservationClick = (reservation: any) => {
    setSelectedReservation(reservation);
  };

  const handleShowAllForDate = (dateKey: string, items: any[]) => {
    const dateObject = new Date(dateKey);
    const formattedDate = new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(dateObject);

    setSelectedDateReservations({ date: formattedDate, reservations: items });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Wird geladen...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Reservierungen ({reservations.length})
          </h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="table">
              <List className="w-4 h-4 mr-2" />
              Tabelle
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="w-4 h-4 mr-2" />
              Kalender
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <Card>
              <CardContent className="p-0">
                {reservations.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    Keine Reservierungen gefunden.
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Kontakt</TableHead>
                          <TableHead>Datum</TableHead>
                          <TableHead>Uhrzeit</TableHead>
                          <TableHead>Gäste</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aktionen</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedReservations.map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {reservation.name}
                                </div>
                                {reservation.specialRequests && (
                                  <div className="text-xs text-gray-500 max-w-[200px] truncate">
                                    {reservation.specialRequests}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{reservation.email}</div>
                                <div className="text-gray-500">
                                  {reservation.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{reservation.date}</TableCell>
                            <TableCell>{formatTimeLabel(reservation.time)}</TableCell>
                            <TableCell>{reservation.guests}</TableCell>
                            <TableCell>
                              {getStatusBadge(reservation.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                {reservation.status !== "confirmed" && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      updateReservationStatus(
                                        reservation.id,
                                        "confirmed",
                                      )
                                    }
                                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    title="Bestätigen"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                {reservation.status !== "cancelled" && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      updateReservationStatus(
                                        reservation.id,
                                        "cancelled",
                                      )
                                    }
                                    className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                    title="Stornieren"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteReservation(reservation.id)}
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  title="Löschen"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {totalPages > 1 && (
                      <div className="flex items-center justify-between px-4 py-3 border-t">
                        <div className="text-sm text-gray-500">
                          Seite {currentPage} von {totalPages}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((page) => Math.max(1, page - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Zurück
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((page) =>
                                Math.min(totalPages, page + 1),
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Weiter
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="outline" size="sm" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">
                    {monthNames[calendarMonth]} {calendarYear}
                  </h3>
                  <Button variant="outline" size="sm" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="min-h-[100px] p-2" />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const dateKey = formatDateKey(day);
                    const dayReservations = reservationsByDate[dateKey] || [];
                    const isToday =
                      new Date().toISOString().split("T")[0] === dateKey;
                    const displayLimit = 2;

                    return (
                      <div
                        key={day}
                        className={`min-h-[100px] p-2 border rounded-md ${
                          isToday ? "bg-blue-50 border-blue-200" : "bg-white"
                        }`}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isToday ? "text-blue-600" : "text-gray-700"
                          }`}
                        >
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayReservations.slice(0, displayLimit).map((reservation) => (
                            <div
                              key={reservation.id}
                              onClick={() => handleReservationClick(reservation)}
                              className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                                reservation.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : reservation.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                              title={`${reservation.name} - ${formatTimeLabel(reservation.time)} - ${reservation.guests} Gäste`}
                            >
                              {formatTimeLabel(reservation.time)} {reservation.name}
                            </div>
                          ))}
                          {dayReservations.length > displayLimit && (
                            <button
                              onClick={() =>
                                handleShowAllForDate(dateKey, dayReservations)
                              }
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer w-full text-left"
                            >
                              +{dayReservations.length - displayLimit} mehr
                              anzeigen
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300" />
                    <span className="text-sm text-gray-600">Ausstehend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
                    <span className="text-sm text-gray-600">Bestätigt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-100 border border-red-300" />
                    <span className="text-sm text-gray-600">Storniert</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Reservierungsdetails</h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-medium">
                  {selectedReservation.name}
                </span>
                {getStatusBadge(selectedReservation.status)}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedReservation.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeLabel(selectedReservation.time)} Uhr</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{selectedReservation.guests} Gäste</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${selectedReservation.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedReservation.email}
                  </a>
                </div>
                {selectedReservation.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${selectedReservation.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedReservation.phone}
                    </a>
                  </div>
                )}
                {selectedReservation.specialRequests && (
                  <div className="flex items-start gap-3 text-gray-600">
                    <MessageSquare className="w-4 h-4 mt-0.5" />
                    <span>{selectedReservation.specialRequests}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {selectedReservation.status !== "confirmed" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      updateReservationStatus(
                        selectedReservation.id,
                        "confirmed",
                      );
                      setSelectedReservation(null);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Bestätigen
                  </Button>
                )}
                {selectedReservation.status !== "cancelled" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      updateReservationStatus(
                        selectedReservation.id,
                        "cancelled",
                      );
                      setSelectedReservation(null);
                    }}
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Stornieren
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    deleteReservation(selectedReservation.id);
                    setSelectedReservation(null);
                  }}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Löschen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedDateReservations && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Reservierungen für {selectedDateReservations.date}
              </h3>
              <button
                onClick={() => setSelectedDateReservations(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {selectedDateReservations.reservations
                .sort((a, b) =>
                  formatTimeLabel(a.time).localeCompare(formatTimeLabel(b.time)),
                )
                .map((reservation) => (
                  <div
                    key={reservation.id}
                    onClick={() => {
                      setSelectedDateReservations(null);
                      handleReservationClick(reservation);
                    }}
                    className={`p-3 rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
                      reservation.status === "confirmed"
                        ? "bg-green-50 border border-green-200"
                        : reservation.status === "cancelled"
                          ? "bg-red-50 border border-red-200"
                          : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{reservation.name}</div>
                      {getStatusBadge(reservation.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeLabel(reservation.time)} Uhr
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {reservation.guests} Gäste
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
