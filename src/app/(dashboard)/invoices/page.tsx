'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { getCurrentUser } from '@/lib/auth/auth';
import { User, Invoice, InvoiceStatus } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

// Mock data for demonstration
const mockInvoices: Invoice[] = [
  {
    id: '1',
    parent_id: '1',
    booking_id: '1',
    invoice_number: 'INV-2024-001',
    amount: 150000, // R1,500.00 in cents
    currency: 'ZAR',
    status: 'paid',
    due_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    paid_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    payment_proof_url: '/api/placeholder/proof1.pdf',
    description: 'Training session for Max - Recall training',
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '2',
    parent_id: '2',
    booking_id: '2',
    invoice_number: 'INV-2024-002',
    amount: 250000, // R2,500.00 in cents
    currency: 'ZAR',
    status: 'pending',
    due_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    description: 'Behavioral session for Luna - Anxiety training',
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    parent_id: '3',
    booking_id: '3',
    invoice_number: 'INV-2024-003',
    amount: 80000, // R800.00 in cents
    currency: 'ZAR',
    status: 'overdue',
    due_date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    description: 'Daycare session for Buddy',
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    updated_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '4',
    parent_id: '1',
    booking_id: '4',
    invoice_number: 'INV-2024-004',
    amount: 120000, // R1,200.00 in cents
    currency: 'ZAR',
    status: 'pending',
    due_date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    description: 'Follow-up training session for Max',
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const mockParents = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: '2', name: 'Mike Smith', email: 'mike@example.com' },
  { id: '3', name: 'Lisa Brown', email: 'lisa@example.com' },
];

const getStatusIcon = (status: InvoiceStatus) => {
  switch (status) {
    case 'paid':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'pending':
      return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    case 'overdue':
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    case 'cancelled':
      return <XCircleIcon className="h-5 w-5 text-gray-500" />;
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function InvoicesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Filter invoices based on user role
        if (currentUser?.role === 'parent') {
          // Parents only see their own invoices
          setInvoices(mockInvoices.filter(invoice => invoice.parent_id === currentUser.id));
        } else {
          // Admins and trainers see all invoices
          setInvoices(mockInvoices);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const filteredInvoices = invoices.filter(invoice => 
    (filter === 'all' || invoice.status === filter) &&
    (invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  const getParentName = (parentId: string) => {
    const parent = mockParents.find(p => p.id === parentId);
    return parent?.name || 'Unknown Parent';
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">
            Manage billing and payment tracking
          </p>
        </div>
        {user?.role === 'admin' && (
          <Button className="mt-4 sm:mt-0">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search invoices by number or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From paid invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingAmount)}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overdueAmount)}</div>
            <p className="text-xs text-muted-foreground">
              Past due date
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">
              All invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending
        </Button>
        <Button
          variant={filter === 'paid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('paid')}
        >
          Paid
        </Button>
        <Button
          variant={filter === 'overdue' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('overdue')}
        >
          Overdue
        </Button>
        <Button
          variant={filter === 'cancelled' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </Button>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getStatusIcon(invoice.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{invoice.invoice_number}</h3>
                      <p className="text-sm text-gray-600">
                        {getParentName(invoice.parent_id)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Amount</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Due Date</p>
                      <p className={`text-sm ${isOverdue(invoice.due_date) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                        {formatDate(invoice.due_date)}
                        {isOverdue(invoice.due_date) && ' (Overdue)'}
                      </p>
                    </div>
                  </div>

                  {invoice.description && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700">Description</p>
                      <p className="text-sm text-gray-600">{invoice.description}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>

                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm">
                    View Details
                  </Button>
                  {invoice.status === 'pending' && (
                    <Button size="sm" variant="outline">
                      Mark as Paid
                    </Button>
                  )}
                  {invoice.status === 'overdue' && (
                    <Button size="sm" variant="outline">
                      Send Reminder
                    </Button>
                  )}
                  {invoice.payment_proof_url && (
                    <Button size="sm" variant="outline">
                      View Proof
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first invoice.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
