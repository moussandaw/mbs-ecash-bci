/**
 * RAPPORTS PÉRIODIQUES BCI - BACKOFFICE ADMINISTRATEUR
 * Système de gestion avancée des rapports avec fonctionnalités complètes
 * Version: 1.2.1
 * Auteur: Équipe Dev BCI
 */

class RapportsPeriodiquesBCI {
    constructor() {
        this.reports = [];
        this.filteredReports = [];
        this.currentFilters = {};
        this.sortConfig = { field: 'generated', direction: 'desc' };
        this.currentPage = 1;
        this.itemsPerPage = 25;
        this.selectedReports = new Set();
        this.notifications = [];
        this.historyData = [];
        
        this.init();
    }

    // === INITIALISATION ===
    init() {
        this.loadMockData();
        this.bindEvents();
        this.initializeUI();
        this.updateLastSync();
        this.startNotificationSystem();
        
        console.log('✅ Système Rapports Périodiques BCI initialisé');
    }

    // === DONNÉES MOCK ===
    loadMockData() {
        this.reports = [
            {
                id: 'RPT_SLA_0625_X394',
                period: '2025-06',
                type: 'sla',
                typeName: 'SLA',
                generated: '2025-07-01T08:30:00',
                transactions: 1250,
                amount: 85000000,
                status: 'ok',
                formats: ['pdf', 'excel'],
                lastAccess: '2025-07-03T11:24:00',
                user: 'manager1@bci.gn',
                enterprise: 'Groupe AMANA',
                isNew: false
            },
            {
                id: 'RPT_SYNTHESE_0625_X395',
                period: '2025-06',
                type: 'synthese',
                typeName: 'Synthèse',
                generated: '2025-07-01T09:15:00',
                transactions: 980,
                amount: 78000000,
                status: 'nok',
                formats: ['pdf'],
                lastAccess: '2025-07-01T09:03:00',
                user: 'it.admin@bci.gn',
                enterprise: 'SONOCO',
                error: 'Timeout JDBC - Service indisponible',
                isNew: true
            },
            {
                id: 'RPT_CONFORMITE_0525_X340',
                period: '2025-05',
                type: 'conformite',
                typeName: 'Conformité',
                generated: '2025-06-01T14:22:00',
                transactions: 2150,
                amount: 125000000,
                status: 'ok',
                formats: ['pdf', 'excel', 'csv'],
                lastAccess: '2025-06-15T16:45:00',
                user: 'conf.sec@bci.gn',
                enterprise: 'BCI Entreprises',
                isNew: false
            },
            {
                id: 'RPT_INCIDENTS_0625_X396',
                period: '2025-06',
                type: 'incidents',
                typeName: 'Incidents',
                generated: '2025-07-02T10:00:00',
                transactions: 45,
                amount: 850000,
                status: 'processing',
                formats: ['pdf'],
                lastAccess: null,
                user: 'audit.ext@bci.gn',
                enterprise: 'Toutes',
                isNew: true
            },
            {
                id: 'RPT_TRANSACTIONS_0525_X341',
                period: '2025-05',
                type: 'transactions',
                typeName: 'Transactions',
                generated: '2025-06-01T11:45:00',
                transactions: 3200,
                amount: 234000000,
                status: 'ok',
                formats: ['excel', 'csv'],
                lastAccess: '2025-06-20T14:30:00',
                user: 'reporting@bci.gn',
                enterprise: 'Groupe AMANA',
                isNew: false
            },
            {
                id: 'RPT_SLA_0525_X342',
                period: '2025-05',
                type: 'sla',
                typeName: 'SLA',
                generated: '2025-06-01T08:15:00',
                transactions: 1100,
                amount: 67000000,
                status: 'nok',
                formats: ['pdf'],
                lastAccess: '2025-06-02T09:20:00',
                user: 'it.admin@bci.gn',
                enterprise: 'SONOCO',
                error: 'Erreur validation conformité',
                isNew: false
            },
            {
                id: 'RPT_SYNTHESE_0425_X320',
                period: '2025-04',
                type: 'synthese',
                typeName: 'Synthèse',
                generated: '2025-05-01T09:30:00',
                transactions: 890,
                amount: 54000000,
                status: 'pending',
                formats: [],
                lastAccess: null,
                user: 'system.batch@bci.gn',
                enterprise: 'BCI Entreprises',
                isNew: false
            }
        ];

        this.historyData = [
            {
                id: 'H001',
                date: '2025-07-03T10:14:00',
                action: 'Export PDF',
                user: 'K.Diallo',
                userEmail: 'k.diallo@bci.gn',
                role: 'Support Avancé',
                reportId: 'RPT_SLA_0625_X394',
                reportName: 'SLA Juin 2025',
                result: 'success',
                details: 'Fichier: Rapport_SLA_Juin.pdf'
            },
            {
                id: 'H002',
                date: '2025-07-02T08:41:00',
                action: 'Génération manuelle',
                user: 'IT.Batch',
                userEmail: 'it.batch@bci.gn',
                role: 'Système',
                reportId: 'RPT_INCIDENTS_0625_X396',
                reportName: 'Incidents Juin 2025',
                result: 'error',
                details: 'Batch #XZ998 - Timeout'
            },
            {
                id: 'H003',
                date: '2025-07-01T15:22:00',
                action: 'Partage email',
                user: 'M.Sow',
                userEmail: 'm.sow@bci.gn',
                role: 'Manager Entreprise',
                reportId: 'RPT_CONFORMITE_0525_X340',
                reportName: 'Conformité Mai 2025',
                result: 'success',
                details: 'Vers: audit@bci.com'
            }
        ];

        this.notifications = [
            {
                id: 'N001',
                type: 'error',
                title: 'Rapport échoué',
                message: 'Le rapport SLA Juin 2025 a échoué (Timeout JDBC)',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: false
            },
            {
                id: 'N002',
                type: 'success',
                title: 'Export réussi',
                message: 'Rapport Synthèse exporté avec succès',
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                read: false
            },
            {
                id: 'N003',
                type: 'warning',
                title: 'Rapport en attente',
                message: 'Le rapport Incidents attend validation',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                read: true
            }
        ];

        this.filteredReports = [...this.reports];
    }

    // === ÉVÉNEMENTS ===
    bindEvents() {
        // Filtres
        document.getElementById('applyFiltersBtn').addEventListener('click', () => this.applyFilters());
        document.getElementById('resetFiltersBtn').addEventListener('click', () => this.resetFilters());
        document.getElementById('resetFiltersBtn2').addEventListener('click', () => this.resetFilters());
        document.getElementById('clearFiltersBtn').addEventListener('click', () => this.resetFilters());
        
        // Actions principales
        document.getElementById('exportAllBtn').addEventListener('click', () => this.exportAllReports());
        document.getElementById('confirmGenerateBtn').addEventListener('click', () => this.generateReport());
        
        // Tri du tableau
        document.querySelectorAll('[data-sort]').forEach(header => {
            header.addEventListener('click', (e) => this.sortTable(e.target.dataset.sort));
        });

        // Sélection multiple
        document.getElementById('selectAllReports').addEventListener('change', (e) => this.toggleSelectAll(e.target.checked));
        
        // Pagination
        document.getElementById('itemsPerPage').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderReports();
        });

        // Recherche rapide
        document.getElementById('quickSearchInput').addEventListener('input', (e) => this.quickSearch(e.target.value));

        // Authentification
        document.getElementById('authValidateBtn').addEventListener('click', () => this.validateAuth());
        document.getElementById('authCancelBtn').addEventListener('click', () => this.cancelAuth());

        // Partage
        document.getElementById('confirmShareBtn').addEventListener('click', () => this.confirmShare());
        document.getElementById('addRecipientBtn').addEventListener('click', () => this.addRecipient());

        // Suppression
        document.getElementById('confirmDeletion').addEventListener('change', (e) => {
            document.getElementById('confirmDeleteBtn').disabled = !e.target.checked;
        });
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());

        // Notifications
        document.getElementById('notificationBtn').addEventListener('click', () => this.showNotifications());

        // Sauvegarde des filtres
        document.getElementById('saveFiltersBtn').addEventListener('click', () => this.saveCurrentFilters());

        // Gestion des modales
        this.bindModalEvents();
    }

    bindModalEvents() {
        // Gestion des actions sur les rapports
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.dataset.action;
            const reportId = target.dataset.reportId;
            const report = this.reports.find(r => r.id === reportId);

            if (!report) return;

            switch (action) {
                case 'view':
                    this.viewReport(report);
                    break;
                case 'export':
                    this.exportReport(report);
                    break;
                case 'share':
                    this.shareReport(report);
                    break;
                case 'logs':
                    this.viewLogs(report);
                    break;
                case 'delete':
                    this.deleteReport(report);
                    break;
                case 'relaunch':
                    this.relaunchReport(report);
                    break;
            }
        });
    }

    // === INTERFACE UTILISATEUR ===
    initializeUI() {
        this.renderReports();
        this.renderHistory();
        this.updateNotificationBadge();
        this.checkIncidents();
        this.initCharts();
    }

    renderReports() {
        const tbody = document.getElementById('reportsTableBody');
        const emptyState = document.getElementById('emptyState');
        
        if (this.filteredReports.length === 0) {
            tbody.innerHTML = '';
            emptyState.style.display = 'block';
            document.querySelector('.table-responsive').style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        document.querySelector('.table-responsive').style.display = 'block';

        // Pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedReports = this.filteredReports.slice(startIndex, endIndex);

        tbody.innerHTML = paginatedReports.map(report => this.renderReportRow(report)).join('');
        
        this.updatePagination();
        this.updateTotalCount();
    }

    renderReportRow(report) {
        const statusBadge = this.getStatusBadge(report.status);
        const formatIcons = this.getFormatIcons(report.formats);
        const actions = this.getReportActions(report);
        const newBadge = report.isNew ? '<span class="badge bg-info ms-1">Nouveau</span>' : '';
        
        return `
            <tr class="${report.status === 'nok' ? 'table-danger' : ''} ${report.isNew ? 'table-info' : ''}">
                <td>
                    <input type="checkbox" class="form-check-input report-checkbox" 
                           value="${report.id}" ${this.selectedReports.has(report.id) ? 'checked' : ''}>
                </td>
                <td>
                    <strong>${this.formatPeriod(report.period)}</strong>
                    ${newBadge}
                </td>
                <td>
                    <span class="badge bg-secondary">${report.typeName}</span>
                </td>
                <td>
                    <small class="text-muted">${this.formatDateTime(report.generated)}</small>
                </td>
                <td class="text-end">
                    <span class="fw-bold">${this.formatNumber(report.transactions)}</span>
                </td>
                <td class="text-end">
                    <span class="fw-bold">${this.formatAmount(report.amount)} GNF</span>
                </td>
                <td>${statusBadge}</td>
                <td>${formatIcons}</td>
                <td>
                    <small class="text-muted">
                        ${report.lastAccess ? this.formatDateTime(report.lastAccess) : '---'}
                    </small>
                </td>
                <td>
                    <div class="btn-group btn-group-sm">
                        ${actions}
                    </div>
                </td>
            </tr>
        `;
    }

    getStatusBadge(status) {
        const statusMap = {
            ok: '<span class="badge bg-success"><i class="bi bi-check-circle"></i> OK</span>',
            nok: '<span class="badge bg-danger"><i class="bi bi-x-circle"></i> NOK</span>',
            pending: '<span class="badge bg-warning"><i class="bi bi-clock"></i> En attente</span>',
            processing: '<span class="badge bg-info"><i class="bi bi-arrow-clockwise"></i> En cours</span>'
        };
        return statusMap[status] || '<span class="badge bg-secondary">Inconnu</span>';
    }

    getFormatIcons(formats) {
        const icons = {
            pdf: '<i class="bi bi-file-pdf text-danger" title="PDF"></i>',
            excel: '<i class="bi bi-file-excel text-success" title="Excel"></i>',
            csv: '<i class="bi bi-file-text text-primary" title="CSV"></i>',
            word: '<i class="bi bi-file-word text-primary" title="Word"></i>'
        };
        
        if (formats.length === 0) {
            return '<i class="bi bi-hourglass text-muted" title="En cours"></i>';
        }
        
        return formats.map(format => icons[format] || '').join(' ');
    }

    getReportActions(report) {
        let actions = `
            <button class="btn btn-outline-primary btn-sm" data-action="view" data-report-id="${report.id}" title="Voir">
                <i class="bi bi-eye"></i>
            </button>
        `;

        if (report.formats.length > 0) {
            actions += `
                <button class="btn btn-outline-success btn-sm" data-action="export" data-report-id="${report.id}" title="Exporter">
                    <i class="bi bi-download"></i>
                </button>
                <button class="btn btn-outline-info btn-sm" data-action="share" data-report-id="${report.id}" title="Partager">
                    <i class="bi bi-share"></i>
                </button>
            `;
        }

        if (report.status === 'nok' || report.error) {
            actions += `
                <button class="btn btn-outline-warning btn-sm" data-action="logs" data-report-id="${report.id}" title="Voir logs">
                    <i class="bi bi-file-text"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" data-action="relaunch" data-report-id="${report.id}" title="Relancer">
                    <i class="bi bi-arrow-repeat"></i>
                </button>
            `;
        }

        // Action de suppression (avec vérification des droits)
        if (this.canDeleteReport(report)) {
            actions += `
                <button class="btn btn-outline-danger btn-sm" data-action="delete" data-report-id="${report.id}" title="Supprimer">
                    <i class="bi bi-trash"></i>
                </button>
            `;
        }

        return actions;
    }

    canDeleteReport(report) {
        // Logique de vérification des droits de suppression
        const userRole = 'manager'; // À récupérer depuis l'authentification
        const allowedRoles = ['admin', 'manager', 'support'];
        
        return allowedRoles.includes(userRole) && report.status !== 'processing';
    }

    // === FILTRAGE ===
    applyFilters() {
        const filters = this.getActiveFilters();
        this.currentFilters = filters;
        
        this.filteredReports = this.reports.filter(report => {
            // Filtre par période
            if (filters.period && report.period !== filters.period) return false;
            
            // Filtre par type
            if (filters.type && report.type !== filters.type) return false;
            
            // Filtre par entreprise
            if (filters.enterprise && !report.enterprise.toLowerCase().includes(filters.enterprise.toLowerCase())) return false;
            
            // Filtre par statut
            if (filters.status && report.status !== filters.status) return false;
            
            // Filtre par utilisateur
            if (filters.user && !report.user.toLowerCase().includes(filters.user.toLowerCase())) return false;
            
            // Filtre par format
            if (filters.formats && filters.formats.length > 0) {
                const hasFormat = filters.formats.some(format => report.formats.includes(format));
                if (!hasFormat) return false;
            }
            
            // Filtre par montant
            if (filters.amountMin && report.amount < filters.amountMin) return false;
            if (filters.amountMax && report.amount > filters.amountMax) return false;
            
            return true;
        });

        this.currentPage = 1;
        this.renderReports();
        this.updateActiveFiltersDisplay();
        this.showToast('Filtres appliqués avec succès', 'success');
    }

    getActiveFilters() {
        return {
            period: document.getElementById('periodFilter').value,
            type: document.getElementById('typeFilter').value,
            enterprise: document.getElementById('enterpriseFilter').value,
            status: document.getElementById('statusFilter').value,
            user: document.getElementById('userFilter').value,
            formats: Array.from(document.querySelectorAll('input[type="checkbox"][id^="format"]:checked')).map(cb => cb.value),
            amountMin: parseFloat(document.getElementById('amountMin').value) || null,
            amountMax: parseFloat(document.getElementById('amountMax').value) || null,
            profile: document.getElementById('profileFilter').value
        };
    }

    resetFilters() {
        // Réinitialiser tous les champs de filtre
        document.getElementById('periodFilter').value = '';
        document.getElementById('typeFilter').value = '';
        document.getElementById('enterpriseFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('userFilter').value = '';
        document.getElementById('amountMin').value = '';
        document.getElementById('amountMax').value = '';
        document.getElementById('profileFilter').value = '';
        
        // Décocher toutes les cases à cocher
        document.querySelectorAll('input[type="checkbox"][id^="format"]').forEach(cb => cb.checked = false);
        
        this.currentFilters = {};
        this.filteredReports = [...this.reports];
        this.currentPage = 1;
        this.renderReports();
        this.updateActiveFiltersDisplay();
        this.showToast('Filtres réinitialisés', 'info');
    }

    updateActiveFiltersDisplay() {
        const section = document.getElementById('activeFiltersSection');
        const tagsContainer = document.getElementById('activeFiltersTags');
        
        const activeFilters = Object.entries(this.currentFilters).filter(([key, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            return value && value !== '';
        });

        if (activeFilters.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        tagsContainer.innerHTML = activeFilters.map(([key, value]) => {
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            return `
                <span class="badge bg-primary me-1">
                    ${this.getFilterLabel(key)}: ${displayValue}
                    <button type="button" class="btn-close btn-close-white ms-1" onclick="bciReports.removeFilter('${key}')"></button>
                </span>
            `;
        }).join('');
    }

    getFilterLabel(key) {
        const labels = {
            period: 'Période',
            type: 'Type',
            enterprise: 'Entreprise',
            status: 'Statut',
            user: 'Utilisateur',
            formats: 'Formats',
            amountMin: 'Montant min',
            amountMax: 'Montant max',
            profile: 'Profil'
        };
        return labels[key] || key;
    }

    removeFilter(key) {
        delete this.currentFilters[key];
        this.applyFilters();
    }

    quickSearch(query) {
        if (!query.trim()) {
            this.filteredReports = [...this.reports];
        } else {
            this.filteredReports = this.reports.filter(report => 
                report.id.toLowerCase().includes(query.toLowerCase()) ||
                report.typeName.toLowerCase().includes(query.toLowerCase()) ||
                report.enterprise.toLowerCase().includes(query.toLowerCase()) ||
                report.user.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        this.currentPage = 1;
        this.renderReports();
    }

    // === TRI ===
    sortTable(field) {
        if (this.sortConfig.field === field) {
            this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortConfig.field = field;
            this.sortConfig.direction = 'asc';
        }

        this.filteredReports.sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];

            // Traitement spécial pour les dates
            if (field === 'generated' || field === 'lastAccess') {
                valueA = valueA ? new Date(valueA).getTime() : 0;
                valueB = valueB ? new Date(valueB).getTime() : 0;
            }

            // Traitement spécial pour les nombres
            if (field === 'transactions' || field === 'amount') {
                valueA = parseFloat(valueA) || 0;
                valueB = parseFloat(valueB) || 0;
            }

            let result = 0;
            if (valueA < valueB) result = -1;
            else if (valueA > valueB) result = 1;

            return this.sortConfig.direction === 'desc' ? -result : result;
        });

        this.renderReports();
        this.updateSortIndicators(field);
    }

    updateSortIndicators(activeField) {
        document.querySelectorAll('[data-sort] i').forEach(icon => {
            icon.className = 'bi bi-arrow-down-up';
        });

        const activeIcon = document.querySelector(`[data-sort="${activeField}"] i`);
        if (activeIcon) {
            activeIcon.className = `bi bi-arrow-${this.sortConfig.direction === 'asc' ? 'up' : 'down'}`;
        }
    }

    // === PAGINATION ===
    updatePagination() {
        const totalPages = Math.ceil(this.filteredReports.length / this.itemsPerPage);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Bouton précédent
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="bciReports.goToPage(${this.currentPage - 1})">Précédent</a>
            </li>
        `;

        // Pages
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="bciReports.goToPage(${i})">${i}</a>
                </li>
            `;
        }

        // Bouton suivant
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="bciReports.goToPage(${this.currentPage + 1})">Suivant</a>
            </li>
        `;

        pagination.innerHTML = paginationHTML;
        
        // Mise à jour des indicateurs
        document.getElementById('showingFrom').textContent = (this.currentPage - 1) * this.itemsPerPage + 1;
        document.getElementById('showingTo').textContent = Math.min(this.currentPage * this.itemsPerPage, this.filteredReports.length);
        document.getElementById('totalItems').textContent = this.filteredReports.length;
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredReports.length / this.itemsPerPage);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderReports();
    }

    updateTotalCount() {
        document.getElementById('totalCount').textContent = `${this.filteredReports.length} rapport${this.filteredReports.length > 1 ? 's' : ''}`;
    }

    // === ACTIONS SUR LES RAPPORTS ===
    viewReport(report) {
        this.showToast(`Visualisation du rapport ${report.typeName} - ${this.formatPeriod(report.period)}`, 'info');
        
        // Simulation de l'ouverture en modale ou nouvel onglet
        const reportData = {
            id: report.id,
            type: report.typeName,
            period: this.formatPeriod(report.period),
            transactions: report.transactions,
            amount: this.formatAmount(report.amount),
            status: report.status,
            generated: this.formatDateTime(report.generated)
        };

        console.log('📄 Rapport visualisé:', reportData);
        
        // Mettre à jour l'historique
        this.addToHistory('Visualisation', report, 'success', 'Rapport consulté');
    }

    exportReport(report) {
        this.requireAuth('Exporter le rapport ' + report.typeName, () => {
            this.performExport(report);
        });
    }

    performExport(report, format = 'pdf') {
        this.showToast('Génération de l\'export en cours...', 'info');
        
        // Simulation du processus d'export
        setTimeout(() => {
            try {
                if (format === 'pdf') {
                    this.generatePDF(report);
                } else if (format === 'excel') {
                    this.generateExcel(report);
                } else if (format === 'csv') {
                    this.generateCSV(report);
                }
                
                this.showToast(`Rapport ${report.typeName} exporté avec succès`, 'success');
                this.addToHistory('Export ' + format.toUpperCase(), report, 'success', `Fichier généré: ${report.id}.${format}`);
            } catch (error) {
                this.showToast('Erreur lors de l\'export', 'error');
                this.addToHistory('Export ' + format.toUpperCase(), report, 'error', error.message);
            }
        }, 1500);
    }

    generatePDF(report) {
        // Utilisation de jsPDF pour générer le PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // En-tête BCI
        doc.setFontSize(20);
        doc.setTextColor(0, 64, 128); // Bleu BCI
        doc.text('BANQUE POUR LE COMMERCE ET L\'INDUSTRIE', 20, 30);
        
        doc.setFontSize(16);
        doc.text(`Rapport ${report.typeName} - ${this.formatPeriod(report.period)}`, 20, 50);
        
        // Informations du rapport
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`ID Rapport: ${report.id}`, 20, 70);
        doc.text(`Généré le: ${this.formatDateTime(report.generated)}`, 20, 85);
        doc.text(`Nombre de transactions: ${this.formatNumber(report.transactions)}`, 20, 100);
        doc.text(`Montant total: ${this.formatAmount(report.amount)} GNF`, 20, 115);
        doc.text(`Statut: ${report.status.toUpperCase()}`, 20, 130);
        doc.text(`Entreprise: ${report.enterprise}`, 20, 145);
        
        // Tableau de données (simulation)
        const tableData = [
            ['Période', this.formatPeriod(report.period)],
            ['Type', report.typeName],
            ['Transactions', this.formatNumber(report.transactions)],
            ['Montant', this.formatAmount(report.amount) + ' GNF'],
            ['Statut', report.status.toUpperCase()],
            ['Utilisateur', report.user]
        ];
        
        doc.autoTable({
            head: [['Propriété', 'Valeur']],
            body: tableData,
            startY: 160,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 64, 128] }
        });
        
        // Pied de page
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text(`Page ${i} sur ${pageCount}`, 20, doc.internal.pageSize.height - 10);
            doc.text(`Généré le ${new Date().toLocaleString('fr-FR')}`, 120, doc.internal.pageSize.height - 10);
            doc.text('Document confidentiel BCI', 20, doc.internal.pageSize.height - 20);
        }
        
        // Téléchargement
        doc.save(`${report.id}_${report.typeName}_${report.period}.pdf`);
    }

    generateExcel(report) {
        // Simulation de génération Excel
        const data = [
            ['BANQUE POUR LE COMMERCE ET L\'INDUSTRIE'],
            [`Rapport ${report.typeName} - ${this.formatPeriod(report.period)}`],
            [''],
            ['ID Rapport', report.id],
            ['Généré le', this.formatDateTime(report.generated)],
            ['Nombre de transactions', report.transactions],
            ['Montant total', report.amount],
            ['Statut', report.status],
            ['Entreprise', report.enterprise],
            ['Utilisateur', report.user]
        ];
        
        // Création d'un CSV formaté pour Excel
        const csvContent = data.map(row => 
            Array.isArray(row) ? row.join(';') : row
        ).join('\n');
        
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${report.id}_${report.typeName}_${report.period}.csv`;
        link.click();
    }

    generateCSV(report) {
        const headers = ['ID', 'Type', 'Période', 'Transactions', 'Montant', 'Statut', 'Entreprise', 'Utilisateur'];
        const data = [
            report.id,
            report.typeName,
            this.formatPeriod(report.period),
            report.transactions,
            report.amount,
            report.status,
            report.enterprise,
            report.user
        ];
        
        const csvContent = [headers.join(','), data.join(',')].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${report.id}_${report.typeName}_${report.period}.csv`;
        link.click();
    }

    shareReport(report) {
        // Préparer la modale de partage
        document.getElementById('shareReportName').value = `${report.typeName} - ${this.formatPeriod(report.period)}`;
        
        // Stocker le rapport actuel pour le partage
        this.currentShareReport = report;
        
        // Afficher la modale
        const modal = new bootstrap.Modal(document.getElementById('shareModal'));
        modal.show();
    }

    confirmShare() {
        const form = document.getElementById('shareReportForm');
        const formData = new FormData(form);
        
        const recipients = this.getRecipients();
        if (recipients.length === 0) {
            this.showToast('Veuillez ajouter au moins un destinataire', 'warning');
            return;
        }
        
        // Générer un lien sécurisé
        const shareLink = this.generateSecureLink(this.currentShareReport);
        
        this.showToast('Lien de partage généré avec succès', 'success');
        
        // Fermer la modale
        bootstrap.Modal.getInstance(document.getElementById('shareModal')).hide();
        
        // Ajouter à l'historique
        this.addToHistory('Partage', this.currentShareReport, 'success', `Partagé avec: ${recipients.join(', ')}`);
    }

    generateSecureLink(report) {
        const linkId = 'LNK_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const expiresIn = document.getElementById('linkValidity').value;
        
        return {
            id: linkId,
            reportId: report.id,
            url: `https://bci.backoffice.secure/reports/shared/${linkId}`,
            expires: expiresIn,
            requireOtp: document.getElementById('requireOtp').checked,
            requirePassword: document.getElementById('requirePassword').checked
        };
    }

    addRecipient() {
        const emailInput = document.getElementById('recipientEmail');
        const email = emailInput.value.trim();
        
        if (!email || !this.isValidEmail(email)) {
            this.showToast('Adresse email invalide', 'warning');
            return;
        }
        
        const recipientsList = document.getElementById('recipientsList');
        const recipientTag = document.createElement('span');
        recipientTag.className = 'badge bg-primary me-1 mb-1';
        recipientTag.innerHTML = `
            ${email}
            <button type="button" class="btn-close btn-close-white ms-1" onclick="this.parentElement.remove()"></button>
        `;
        
        recipientsList.appendChild(recipientTag);
        emailInput.value = '';
    }

    getRecipients() {
        const tags = document.querySelectorAll('#recipientsList .badge');
        return Array.from(tags).map(tag => tag.textContent.trim());
    }

    viewLogs(report) {
        // Préparer la modale des logs
        document.querySelector('#logsModal .modal-title').innerHTML = 
            `<i class="bi bi-file-text"></i> Logs Techniques - ${report.typeName} ${this.formatPeriod(report.period)}`;
        
        // Afficher la modale
        const modal = new bootstrap.Modal(document.getElementById('logsModal'));
        modal.show();
        
        this.addToHistory('Consultation logs', report, 'success', 'Logs techniques consultés');
    }

    deleteReport(report) {
        // Préparer la modale de suppression
        document.getElementById('deleteReportName').textContent = `${report.typeName} - ${this.formatPeriod(report.period)}`;
        document.getElementById('deleteReportCode').textContent = report.id;
        document.getElementById('deleteReportDate').textContent = this.formatDateTime(report.generated);
        
        // Réinitialiser le formulaire
        document.getElementById('deleteReason').value = '';
        document.getElementById('confirmDeletion').checked = false;
        document.getElementById('confirmDeleteBtn').disabled = true;
        
        // Stocker le rapport à supprimer
        this.currentDeleteReport = report;
        
        // Afficher la modale
        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }

    confirmDelete() {
        const reason = document.getElementById('deleteReason').value.trim();
        if (!reason || reason.length < 10) {
            this.showToast('Le motif doit contenir au moins 10 caractères', 'warning');
            return;
        }
        
        this.requireAuth('Supprimer le rapport ' + this.currentDeleteReport.typeName, () => {
            this.performDelete(this.currentDeleteReport, reason);
        });
    }

    performDelete(report, reason) {
        // Supprimer le rapport de la liste
        this.reports = this.reports.filter(r => r.id !== report.id);
        this.filteredReports = this.filteredReports.filter(r => r.id !== report.id);
        
        // Fermer la modale
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        
        // Actualiser l'affichage
        this.renderReports();
        
        // Notification et historique
        this.showToast(`Rapport ${report.typeName} supprimé avec succès`, 'success');
        this.addToHistory('Suppression', report, 'success', `Motif: ${reason}`);
    }

    relaunchReport(report) {
        this.requireAuth('Relancer le rapport ' + report.typeName, () => {
            this.performRelaunch(report);
        });
    }

    performRelaunch(report) {
        this.showToast('Relance du rapport en cours...', 'info');
        
        // Simulation de la relance
        setTimeout(() => {
            // Mettre à jour le statut
            report.status = 'processing';
            report.generated = new Date().toISOString();
            
            this.renderReports();
            this.showToast(`Rapport ${report.typeName} relancé avec succès`, 'success');
            this.addToHistory('Relance', report, 'success', 'Génération relancée');
        }, 2000);
    }

    // === GÉNÉRATION DE RAPPORT ===
    generateReport() {
        const form = document.getElementById('generateReportForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const reportData = this.getReportFormData();
        
        this.requireAuth('Générer un rapport ' + reportData.type, () => {
            this.performGeneration(reportData);
        });
    }

    getReportFormData() {
        return {
            period: document.getElementById('reportPeriod').value,
            type: document.getElementById('reportType').value,
            target: document.getElementById('reportTarget').value,
            visibility: document.getElementById('reportVisibility').value,
            delivery: document.querySelector('input[name="delivery"]:checked').value,
            formats: Array.from(document.querySelectorAll('input[id^="genFormat"]:checked')).map(cb => cb.value),
            includeLogs: document.getElementById('includeLogs').checked,
            anonymizeData: document.getElementById('anonymizeData').checked,
            addMetadata: document.getElementById('addMetadata').checked,
            includeCharts: document.getElementById('includeCharts').checked
        };
    }

    performGeneration(reportData) {
        this.showToast('Génération du rapport en cours...', 'info');
        
        // Fermer la modale
        bootstrap.Modal.getInstance(document.getElementById('generateReportModal')).hide();
        
        // Simulation de la génération
        setTimeout(() => {
            const newReport = {
                id: 'RPT_' + reportData.type.toUpperCase() + '_' + Date.now(),
                period: reportData.period,
                type: reportData.type,
                typeName: this.getTypeDisplayName(reportData.type),
                generated: new Date().toISOString(),
                transactions: Math.floor(Math.random() * 2000) + 500,
                amount: Math.floor(Math.random() * 100000000) + 10000000,
                status: Math.random() > 0.8 ? 'nok' : 'ok',
                formats: reportData.formats,
                lastAccess: null,
                user: 'current.user@bci.gn',
                enterprise: reportData.target === 'Toutes les entreprises' ? 'Toutes' : reportData.target,
                isNew: true
            };
            
            this.reports.unshift(newReport);
            this.applyFilters();
            
            this.showToast(`Rapport ${newReport.typeName} généré avec succès`, 'success');
            this.addToHistory('Génération manuelle', newReport, 'success', 'Rapport créé');
        }, 3000);
    }

    getTypeDisplayName(type) {
        const types = {
            synthese: 'Synthèse',
            sla: 'SLA',
            transactions: 'Transactions',
            incidents: 'Incidents',
            conformite: 'Conformité'
        };
        return types[type] || type;
    }

    // === AUTHENTIFICATION ===
    requireAuth(actionName, callback) {
        document.getElementById('authActionName').textContent = actionName;
        this.authCallback = callback;
        
        // Réinitialiser le formulaire
        document.getElementById('authForm').reset();
        
        const modal = new bootstrap.Modal(document.getElementById('authModal'));
        modal.show();
    }

    validateAuth() {
        const password = document.getElementById('authPassword').value;
        const otp = document.getElementById('authOtp').value;
        const reason = document.getElementById('authReason').value;
        
        if (!password || !otp || !reason) {
            this.showToast('Tous les champs sont requis', 'warning');
            return;
        }
        
        if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
            this.showToast('Le code OTP doit contenir 6 chiffres', 'warning');
            return;
        }
        
        // Simulation de la validation
        this.showToast('Authentification en cours...', 'info');
        
        setTimeout(() => {
            // Simulation d'une validation réussie
            if (Math.random() > 0.1) { // 90% de succès
                bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
                this.showToast('Authentification réussie', 'success');
                
                if (this.authCallback) {
                    this.authCallback();
                    this.authCallback = null;
                }
            } else {
                this.showToast('Échec de l\'authentification. Vérifiez vos informations.', 'error');
            }
        }, 1500);
    }

    cancelAuth() {
        bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
        this.authCallback = null;
        this.showToast('Action annulée', 'info');
    }

    // === EXPORT MULTIPLE ===
    exportAllReports() {
        if (this.filteredReports.length === 0) {
            this.showToast('Aucun rapport à exporter', 'warning');
            return;
        }
        
        this.requireAuth('Exporter tous les rapports visibles', () => {
            this.performBulkExport();
        });
    }

    performBulkExport() {
        this.showToast(`Export de ${this.filteredReports.length} rapport(s) en cours...`, 'info');
        
        // Simulation de l'export groupé
        setTimeout(() => {
            // Générer un fichier ZIP contenant tous les rapports
            this.generateBulkZip(this.filteredReports);
            this.showToast('Export groupé terminé avec succès', 'success');
            this.addToHistory('Export groupé', { typeName: 'Multiple', id: 'BULK_' + Date.now() }, 'success', `${this.filteredReports.length} rapports exportés`);
        }, 2000);
    }

    generateBulkZip(reports) {
        // Simulation de génération d'un ZIP
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `Rapports_BCI_${timestamp}.zip`;
        
        console.log(`📦 Génération de ${filename} avec ${reports.length} rapports`);
        
        // Dans un vrai cas, on utiliserait une bibliothèque comme JSZip
        this.simulateDownload(filename, 'application/zip');
    }

    simulateDownload(filename, mimeType) {
        const blob = new Blob(['Contenu simulé du fichier'], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    // === HISTORIQUE ===
    renderHistory() {
        const tbody = document.getElementById('historyTableBody');
        tbody.innerHTML = this.historyData.map(entry => `
            <tr>
                <td><small>${this.formatDateTime(entry.date)}</small></td>
                <td>
                    <span class="badge bg-${this.getActionBadgeColor(entry.result)}">${entry.action}</span>
                </td>
                <td>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#profileModal" class="text-decoration-none">
                        ${entry.user}
                    </a>
                    <br><small class="text-muted">${entry.role}</small>
                </td>
                <td>${entry.reportName}</td>
                <td>
                    <span class="badge bg-${entry.result === 'success' ? 'success' : 'danger'}">
                        <i class="bi bi-${entry.result === 'success' ? 'check-circle' : 'x-circle'}"></i>
                        ${entry.result === 'success' ? 'Succès' : 'Échec'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="bciReports.viewHistoryDetails('${entry.id}')" title="Voir détails">
                        <i class="bi bi-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    getActionBadgeColor(result) {
        return result === 'success' ? 'success' : 'danger';
    }

    addToHistory(action, report, result, details) {
        const entry = {
            id: 'H' + Date.now(),
            date: new Date().toISOString(),
            action: action,
            user: 'M.Ndaw',
            userEmail: 'm.ndaw@bci.gn',
            role: 'Superviseur Conformité',
            reportId: report.id,
            reportName: `${report.typeName} ${this.formatPeriod(report.period || 'N/A')}`,
            result: result,
            details: details
        };
        
        this.historyData.unshift(entry);
        
        // Conserver seulement les 50 dernières entrées
        if (this.historyData.length > 50) {
            this.historyData = this.historyData.slice(0, 50);
        }
        
        this.renderHistory();
    }

    viewHistoryDetails(entryId) {
        const entry = this.historyData.find(e => e.id === entryId);
        if (entry) {
            this.showToast(`Détails: ${entry.details}`, 'info');
        }
    }

    // === NOTIFICATIONS ===
    startNotificationSystem() {
        // Mise à jour périodique des notifications
        setInterval(() => {
            this.checkForNewNotifications();
        }, 30000); // Toutes les 30 secondes
    }

    checkForNewNotifications() {
        // Simulation de nouvelles notifications
        if (Math.random() > 0.7) {
            const notification = {
                id: 'N' + Date.now(),
                type: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
                title: 'Nouvelle notification',
                message: 'Une action a été effectuée sur un rapport',
                timestamp: new Date(),
                read: false
            };
            
            this.notifications.unshift(notification);
            this.updateNotificationBadge();
        }
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationBadge');
        
        if (unreadCount === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'block';
            badge.textContent = unreadCount;
        }
    }

    showNotifications() {
        // Créer ou mettre à jour le dropdown des notifications
        let dropdown = document.getElementById('notificationDropdown');
        if (!dropdown) {
            dropdown = this.createNotificationDropdown();
        }
        
        this.renderNotifications(dropdown);
    }

    createNotificationDropdown() {
        const dropdown = document.createElement('div');
        dropdown.id = 'notificationDropdown';
        dropdown.className = 'dropdown-menu dropdown-menu-end show';
        dropdown.style.cssText = 'position: absolute; top: 100%; right: 0; width: 350px; max-height: 400px; overflow-y: auto; z-index: 1050;';
        
        document.getElementById('notificationBtn').parentElement.appendChild(dropdown);
        
        // Fermer le dropdown quand on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !document.getElementById('notificationBtn').contains(e.target)) {
                dropdown.remove();
            }
        });
        
        return dropdown;
    }

    renderNotifications(dropdown) {
        const notificationItems = this.notifications.slice(0, 10).map(notification => `
            <div class="dropdown-item ${notification.read ? '' : 'bg-light'}" onclick="bciReports.markAsRead('${notification.id}')">
                <div class="d-flex align-items-start">
                    <i class="bi bi-${this.getNotificationIcon(notification.type)} me-2 text-${this.getNotificationColor(notification.type)}"></i>
                    <div class="flex-grow-1">
                        <h6 class="mb-1 fs-6">${notification.title}</h6>
                        <p class="mb-1 small text-muted">${notification.message}</p>
                        <small class="text-muted">${this.formatRelativeTime(notification.timestamp)}</small>
                    </div>
                    ${!notification.read ? '<span class="badge bg-primary rounded-pill">Nouveau</span>' : ''}
                </div>
            </div>
        `).join('');
        
        dropdown.innerHTML = `
            <div class="dropdown-header d-flex justify-content-between align-items-center">
                <span>Notifications</span>
                <button class="btn btn-sm btn-link" onclick="bciReports.markAllAsRead()">Tout marquer comme lu</button>
            </div>
            ${notificationItems}
            <div class="dropdown-divider"></div>
            <div class="dropdown-item text-center">
                <a href="#" class="text-decoration-none">Voir toutes les notifications</a>
            </div>
        `;
    }

    getNotificationIcon(type) {
        const icons = {
            info: 'info-circle',
            warning: 'exclamation-triangle',
            error: 'x-circle',
            success: 'check-circle'
        };
        return icons[type] || 'bell';
    }

    getNotificationColor(type) {
        const colors = {
            info: 'info',
            warning: 'warning',
            error: 'danger',
            success: 'success'
        };
        return colors[type] || 'secondary';
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.updateNotificationBadge();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateNotificationBadge();
        this.showToast('Toutes les notifications ont été marquées comme lues', 'success');
    }

    // === INCIDENTS ===
    checkIncidents() {
        const nokReports = this.reports.filter(r => r.status === 'nok');
        const incidentsSection = document.getElementById('incidentsSection');
        
        if (nokReports.length > 0) {
            incidentsSection.style.display = 'block';
            // Mettre à jour le message d'alerte si nécessaire
        } else {
            incidentsSection.style.display = 'none';
        }
    }

    // === GRAPHIQUES ===
    initCharts() {
        // Initialiser les graphiques ApexCharts si nécessaire
        this.createDashboardCharts();
    }

    createDashboardCharts() {
        // Graphique de répartition des rapports par statut
        const statusData = this.getStatusDistribution();
        
        const statusChartOptions = {
            series: statusData.values,
            chart: {
                type: 'donut',
                height: 200
            },
            labels: statusData.labels,
            colors: ['#28a745', '#dc3545', '#ffc107', '#17a2b8'],
            legend: {
                position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };
        
        // Créer le graphique s'il y a un conteneur
        const chartContainer = document.getElementById('statusChart');
        if (chartContainer) {
            const chart = new ApexCharts(chartContainer, statusChartOptions);
            chart.render();
        }
    }

    getStatusDistribution() {
        const statusCount = {};
        this.reports.forEach(report => {
            statusCount[report.status] = (statusCount[report.status] || 0) + 1;
        });
        
        const statusLabels = {
            ok: 'OK',
            nok: 'NOK',
            pending: 'En attente',
            processing: 'En cours'
        };
        
        const labels = Object.keys(statusCount).map(status => statusLabels[status] || status);
        const values = Object.values(statusCount);
        
        return { labels, values };
    }

    // === UTILITAIRES ===
    formatDateTime(dateString) {
        if (!dateString) return '---';
        return new Date(dateString).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatPeriod(period) {
        if (!period) return 'N/A';
        const [year, month] = period.split('-');
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    formatNumber(number) {
        return new Intl.NumberFormat('fr-FR').format(number);
    }

    formatAmount(amount) {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatRelativeTime(date) {
        const diff = Date.now() - new Date(date).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
        if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        return 'À l\'instant';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateLastSync() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('lastSync').textContent = `${timeString} UTC`;
        
        // Mettre à jour toutes les 60 secondes
        setTimeout(() => this.updateLastSync(), 60000);
    }

    saveCurrentFilters() {
        const filters = this.getActiveFilters();
        const filterName = prompt('Nom du filtre personnalisé:');
        
        if (filterName) {
            const savedFilters = JSON.parse(localStorage.getItem('bci_saved_filters') || '{}');
            savedFilters[filterName] = filters;
            localStorage.setItem('bci_saved_filters', JSON.stringify(savedFilters));
            
            this.showToast(`Filtre "${filterName}" sauvegardé`, 'success');
        }
    }

    loadSavedFilters() {
        const savedFilters = JSON.parse(localStorage.getItem('bci_saved_filters') || '{}');
        return savedFilters;
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('notificationToast');
        const toastBody = document.getElementById('toastBody');
        
        // Changer l'icône selon le type
        const iconMap = {
            success: 'check-circle text-success',
            error: 'x-circle text-danger',
            warning: 'exclamation-triangle text-warning',
            info: 'info-circle text-primary'
        };
        
        const icon = document.querySelector('#notificationToast .toast-header i');
        icon.className = `bi bi-${iconMap[type] || iconMap.info} me-2`;
        
        toastBody.textContent = message;
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    // === SÉLECTION MULTIPLE ===
    toggleSelectAll(checked) {
        this.selectedReports.clear();
        
        if (checked) {
            this.filteredReports.forEach(report => {
                this.selectedReports.add(report.id);
            });
        }
        
        document.querySelectorAll('.report-checkbox').forEach(checkbox => {
            checkbox.checked = checked;
        });
        
        this.updateBulkActionsVisibility();
    }

    updateBulkActionsVisibility() {
        const selectedCount = this.selectedReports.size;
        // Logique pour afficher/masquer les actions en lot
        console.log(`${selectedCount} rapport(s) sélectionné(s)`);
    }
}

// === INITIALISATION GLOBALE ===
let bciReports;

document.addEventListener('DOMContentLoaded', function() {
    bciReports = new RapportsPeriodiquesBCI();
    
    // Exposer globalement pour les événements inline
    window.bciReports = bciReports;
    
    console.log('🚀 Application Rapports Périodiques BCI démarrée');
});

// === GESTION DES ERREURS GLOBALES ===
window.addEventListener('error', function(e) {
    console.error('💥 Erreur JavaScript:', e.error);
    if (window.bciReports) {
        bciReports.showToast('Une erreur inattendue s\'est produite', 'error');
    }
});

// === GESTION DES PROMESSES REJETÉES ===
window.addEventListener('unhandledrejection', function(e) {
    console.error('💥 Promesse rejetée:', e.reason);
    if (window.bciReports) {
        bciReports.showToast('Erreur de traitement des données', 'error');
    }
});
