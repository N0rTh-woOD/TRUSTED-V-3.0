#!/bin/bash

# TrusteD-V - MongoDB Backup Script
# Usage: ./backup-mongodb.sh [backup-dir]

BACKUP_DIR="${1:-/var/backups/mongodb}"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/$DATE"

echo "=========================================="
echo "TrusteD-V - MongoDB Backup"
echo "=========================================="
echo ""
echo "Backup location: $BACKUP_PATH"
echo ""

# Create backup directory
mkdir -p "$BACKUP_PATH"

# Run backup
echo "Creating backup..."
mongodump --db trusted_v_db --out "$BACKUP_PATH"

# Compress backup
echo "Compressing backup..."
cd "$BACKUP_DIR"
tar -czf "$DATE.tar.gz" "$DATE"
rm -rf "$DATE"

# Show result
BACKUP_FILE="$BACKUP_DIR/$DATE.tar.gz"
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)

echo ""
echo "=========================================="
echo "Backup Complete!"
echo "=========================================="
echo ""
echo "Backup file: $BACKUP_FILE"
echo "Size: $BACKUP_SIZE"
echo ""

# Cleanup old backups (keep last 7)
echo "Cleaning up old backups (keeping last 7)..."
ls -t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm -f

echo "Done!"
